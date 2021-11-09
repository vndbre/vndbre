import React, { FC, Fragment, useState } from 'react';
import { Heading, Link, Tag } from '@chakra-ui/react';

import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import ISO6391 from 'iso-639-1';
import cls from './OverviewPage.module.css';
import { fetchFullVisualNovel } from '../../../../api/services/visualNovelService';
import { fetchFullReleases } from '../../../../api/services/releaseService';
import { fetchTags } from '../../../../api/services/tagService';
import { StaffRoles } from '../../../../utils/types/staffRoles';
import { VisualNovelLinks } from '../../../../utils/types/visualNovelLinks';
import { TagBlock } from '../../components/TagBlock';

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
        <TagBlock
          title="Developers"
          tags={developers.map(dev => ({ name: dev }))}
        />
        {ISO6391.getAllCodes().map(key => (
          <Fragment key={key}>
            {publishers[key].length > 0 && (
              <TagBlock
                title={`Publisher (${ISO6391.getName(key)})`}
                tags={publishers[key].map(publisher => ({ name: publisher }))}
              />
            )}
          </Fragment>
        ))}
        <div className={cls['overview-info-block']}>
          <Heading as="h3" size="sm">
            Links
          </Heading>
          <div className={cls['overview-items']}>
            {visualNovel && (
                Object.keys(visualNovel.links).map(key => (
                  <Link
                    key={key}
                    color="orange.500"
                    className={cls['overview-link']}
                    href={visualNovel.links[key as keyof VisualNovelLinks] ?? '#'}
                  >
                    {key}
                  </Link>
                ))
            )}
          </div>
        </div>
      </div>
      <div className={cls['overview-content']}>
        {
          tags && tags.length > 0 && (
            <TagBlock title="Tags" tags={tags.map(tag => ({ name: tag.name }))} />
          )
        }
        <div className={cls['overview-staff']}>
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.Director).length > 0 && (
              <TagBlock
                title="Directors"
                tags={visualNovel.staff.filter(staff => staff.role === StaffRoles.Director).map(staff => ({ name: staff.name }))}
              />
            )
          }
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.Scenario).length > 0 && (
              <TagBlock
                title="Directors"
                tags={visualNovel.staff.filter(staff => staff.role === StaffRoles.Scenario).map(staff => ({ name: staff.name }))}
              />
            )
          }
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.Artist).length > 0 && (
              <TagBlock
                title="Artists"
                tags={visualNovel.staff.filter(staff => staff.role === StaffRoles.Artist).map(staff => ({ name: staff.name }))}
              />
            )
          }
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.CharacterDesign).length > 0 && (
              <TagBlock
                title="Character Designers"
                tags={visualNovel.staff.filter(staff => staff.role === StaffRoles.CharacterDesign).map(staff => ({ name: staff.name }))}
              />
            )
          }
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.Songs).length > 0 && (
              <TagBlock
                title="Songs"
                tags={visualNovel.staff.filter(staff => staff.role === StaffRoles.Artist).map(staff => ({
                  name: staff.name,
                  note: staff.note,
                }))}
              />
            )
          }
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.Music).length > 0 && (
              <TagBlock
                title="Music"
                tags={visualNovel.staff.filter(staff => staff.role === StaffRoles.Music).map(staff => ({
                  name: staff.name,
                  note: staff.note,
                }))}
              />
            )
          }
          {
            visualNovel && visualNovel.staff.filter(staff => staff.role === StaffRoles.Staff).length > 0 && (
              <TagBlock
                title="Staff"
                tags={visualNovel.staff.filter(staff => staff.role === StaffRoles.Staff).map(staff => ({
                  name: staff.name,
                  note: staff.note,
                }))}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};
