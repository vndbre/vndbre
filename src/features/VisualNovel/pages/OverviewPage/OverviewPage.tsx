import React, { FC, Fragment } from 'react';
import { Heading, Tag } from '@chakra-ui/react';

import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import ISO6391 from 'iso-639-1';
import cls from './OverviewPage.module.css';
import { fetchFullVisualNovel } from '../../../../api/services/visualNovelService';
import { fetchFullReleases } from '../../../../api/services/releaseService';

/**
 * Overview tab page.
 */
export const OverviewPage: FC = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery(['vn', id], () => fetchFullVisualNovel(id));
  const { isLoading: isReleasesLoading, error: releasesError, data: releases } = useQuery(['releases', id], () => fetchFullReleases(id));

  if (isLoading || isReleasesLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>{`An error has occurred: ${(error as Error).message}`}</>;
  }

  const developers = Array.from(new Set(releases?.map(release => release.producers.filter(p => p.isDeveloper).map(p => p.name)).flat()));
  const publisherReleases = releases?.filter(release => release.producers.filter(p => p.isPublisher)).flat();

  const publishers: Record<string, string[]> = ISO6391.getAllCodes().reduce((acc, val) => ({ ...acc, [val]: [] as string[] }), {});

  publisherReleases?.forEach(release => {
      release.languages.forEach(lang => {
        const publisherNames = release.producers.map(p => p.name);
        const uniquePublisherNames = Array.from(new Set(publishers[lang].concat(publisherNames)));
        publishers[lang] = uniquePublisherNames;
      });
  });

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
        {
          ISO6391.getAllCodes().map(key => (
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
          ))
        }

      </div>
      <div className={cls['overview-content']}>
        <div className={cls['overview-info-block']}>
          <Heading as="h3" size="sm">
            Tags
          </Heading>
          <div className={cls['overview-tags']} />
        </div>
      </div>
    </div>
  );
};
