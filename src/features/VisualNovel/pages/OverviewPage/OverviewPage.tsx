import React, { FC, Fragment, useState } from 'react';
import { Heading, Tag } from '@chakra-ui/react';

import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import ISO6391 from 'iso-639-1';
import cls from './OverviewPage.module.css';
import { fetchFullVisualNovel } from '../../../../api/services/visualNovelService';
import { fetchFullReleases } from '../../../../api/services/releaseService';
import { fetchTags } from '../../../../api/services/tagService';
import { StaffRoles } from '../../../../utils/types/staffRoles';

/**
 * Overview tab page.
 */
export const OverviewPage: FC = () => {
  const { id } = useParams();
  const [developers, setDevelopers] = useState<string[]>([]);
  const [publishers, setPublishers] = useState<Record<string, string[]>>(
    ISO6391.getAllCodes().reduce((acc, val) => ({ ...acc, [val]: [] as string[] }), {}),
  );

  const { isLoading, error, data: visualNovel } = useQuery(['vn', id], () => fetchFullVisualNovel(id));
  const {
    isLoading: isReleasesLoading,
    error: releasesError,
    data: releases,
  } = useQuery(
    ['releases', id],
    () => fetchFullReleases(id),
    {
      onSuccess(releasesData): void {
        setDevelopers(Array.from(new Set(releasesData
          .map(release => release.producers
            .filter(p => p.isDeveloper)
            .map(p => p.name))
          .flat())));

        /**
         * Filling publisher object with unique values.
         */
        const publisherReleases = releasesData.filter(release => release.producers.filter(p => p.isPublisher)).flat();
        const publishersCopy = { ...publishers };
        publisherReleases.forEach(release => {
          release.languages.forEach(lang => {
            const publisherNames = release.producers.map(p => p.name);
            const uniquePublisherNames = Array.from(new Set(publishersCopy[lang].concat(publisherNames)));
            publishersCopy[lang] = uniquePublisherNames;
          });
          setPublishers(publishersCopy);
        });
      },
    },
  );

  const tagIds = visualNovel?.tags.map(tag => tag.id) ?? [];

  const { data: tags } = useQuery(['tags', id], () => fetchTags(tagIds), {
    enabled: tagIds.length > 0,
  });

  if (isLoading || isReleasesLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>{`An error has occurred: ${(error as Error).message}`}</>;
  }

  return (
    <div className={cls['overview-page']}>
      <div className={cls['overview-sidebar']}>
        <div className={cls['overview-info-block']}>
          <Heading as="h3" size="sm">
            Developer
          </Heading>
          <div className={cls['overview-items']}>
            {developers.map(developer => (
              <Tag key={developer}>{developer}</Tag>
            ))}
          </div>
        </div>
        {ISO6391.getAllCodes().map(key => (
          <Fragment key={key}>
            {publishers[key].length > 0 && (
              <div className={cls['overview-info-block']}>
                <Heading as="h3" size="sm" className={cls['overview-publisher-title']}>
                  Publisher (
                  {ISO6391.getName(key)}
                  )
                </Heading>
                <div className={cls['overview-items']}>
                  {publishers[key].map(publisher => (
                    <Tag key={publisher}>{publisher}</Tag>
                  ))}
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className={cls['overview-content']}>
        {
          tags && tags.length > 0 && (
            <div className={cls['overview-info-block']}>
              <Heading as="h3" size="sm">
                Tags
              </Heading>
              <div className={cls['overview-items']}>
                {tags.map(tag => (
                  <Tag key={tag.id}>{tag.name}</Tag>
                ))}
              </div>
            </div>
          )
        }
        <div className={cls['overview-staff']}>
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.Director).length > 0 && (
              <div className={cls['overview-info-block']}>
                <Heading as="h3" size="sm">
                  Director
                </Heading>
                <div className={cls['overview-items']}>
                  {visualNovel.staff.filter(staff => staff.role === StaffRoles.Director).map(staff => (
                    <Tag key={staff.staffId}>{staff.name}</Tag>
                  ))}
                </div>
              </div>
            )
          }
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.Scenario).length > 0 && (
              <div className={cls['overview-info-block']}>
                <Heading as="h3" size="sm">
                  Scenario
                </Heading>
                <div className={cls['overview-items']}>
                  {visualNovel.staff.filter(staff => staff.role === StaffRoles.Scenario).map(staff => (
                    <Tag key={staff.staffId}>{staff.name}</Tag>
                  ))}
                </div>
              </div>
            )
          }
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.Artist).length > 0 && (
              <div className={cls['overview-info-block']}>
                <Heading as="h3" size="sm">
                  Artist
                </Heading>
                <div className={cls['overview-items']}>
                  {visualNovel.staff.filter(staff => staff.role === StaffRoles.Artist).map(staff => (
                    <Tag key={staff.staffId}>{staff.name}</Tag>
                  ))}
                </div>
              </div>
            )
          }
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.CharacterDesign).length > 0 && (
              <div className={cls['overview-info-block']}>
                <Heading as="h3" size="sm">
                  Character Design
                </Heading>
                <div className={cls['overview-items']}>
                  {visualNovel.staff.filter(staff => staff.role === StaffRoles.CharacterDesign).map(staff => (
                    <Tag key={staff.staffId}>{staff.name}</Tag>
                  ))}
                </div>
              </div>
            )
          }
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.Songs).length > 0 && (
              <div className={cls['overview-info-block']}>
                <Heading as="h3" size="sm">
                  Songs
                </Heading>
                <div className={cls['overview-items']}>
                  {visualNovel.staff.filter(staff => staff.role === StaffRoles.Songs).map(staff => (
                    <Tag key={staff.staffId}>
                      {staff.name}
                      <span className={cls['overview-note']}>{staff.note}</span>
                    </Tag>
                  ))}
                </div>
              </div>
            )
          }
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.Music).length > 0 && (
              <div className={cls['overview-info-block']}>
                <Heading as="h3" size="sm">
                  Music
                </Heading>
                <div className={cls['overview-items']}>
                  {visualNovel.staff.filter(staff => staff.role === StaffRoles.Music).map(staff => (
                    <Tag key={staff.staffId}>
                      {staff.name}
                      <span className={cls['overview-note']}>{staff.note}</span>
                    </Tag>
                  ))}
                </div>
              </div>
            )
          }
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.Staff).length > 0 && (
              <div className={cls['overview-info-block']}>
                <Heading as="h3" size="sm">
                  Staff
                </Heading>
                <div className={cls['overview-items']}>
                  {visualNovel.staff.filter(staff => staff.role === StaffRoles.Staff).map(staff => (
                    <Tag key={staff.staffId}>
                      {staff.name}
                      <span className={cls['overview-note']}>{staff.note}</span>
                    </Tag>
                  ))}
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};
