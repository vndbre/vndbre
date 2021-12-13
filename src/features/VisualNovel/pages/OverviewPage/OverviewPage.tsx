import React, { FC, Fragment } from 'react';
import { Heading, Link } from '@chakra-ui/react';

import languageCodes from 'iso-639-1';
import { useParams } from 'react-router';
import cls from './OverviewPage.module.css';
import { StaffRoles, STAFF_ROLES } from '../../../../utils/types/staffRoles';
import { VisualNovelLinks } from '../../../../utils/types/visualNovelLinks';
import { TagBlock } from '../../components/TagBlock/TagBlock';
import { CharacterCard } from '../../components/CharacterCard/CharacterCard';
import { useVisualNovelQuery, useCharactersQuery, useReleasesQuery, useExtendedTagsQuery } from '../../queries';
import { Release } from '../../../../models/release';
import { VisualNovel } from '../../../../models/visualNovel';
import { useSettingsContext } from '../../../../providers';
import { ExtendedTag } from '../../../../models/extendedTag';

/**
 * Overview tab page.
 */
export const OverviewPage: FC = () => {
  const { id } = useParams();
  const { isLoading, error, data: visualNovel } = useVisualNovelQuery(id);

  const {
    isLoading: isReleasesLoading,
    data: releases,
  } = useReleasesQuery(id);

  /**
   * Returns publishers grouped by language.
   * @param releasesData List of releases.
   * @param vnData Visual novel.
   */
  const fillPublishers = (releasesData?: Release[], vnData?: VisualNovel): Record<string, string[]> | null => {
    // Filling publisher object with unique values.
    if (releasesData && vnData) {
      const publisherReleases = releasesData.filter(release => release.producers.filter(p => p.isPublisher)).flat();
      const groupedLangs: Record<string, string[]> = vnData.languages.reduce((acc, val) => ({ ...acc, [val]: [] as string[] }), {});
      publisherReleases.forEach(release => {
        release.languages.forEach(lang => {
          if (lang in vnData.languages) {
            const publisherNames = release.producers.map(p => p.name);
            const uniquePublisherNames = Array.from(new Set(groupedLangs[lang].concat(publisherNames)));
            groupedLangs[lang] = uniquePublisherNames;
          }
        });
      });
      return groupedLangs;
    }
    return null;
  };

  /**
   * Fills developers and publishers arrays.
   * @param releasesData Releases.
   */
  const fillDevelopers = (releasesData?: Release[]): string[] => {
    if (releasesData) {
      return Array.from(new Set(releasesData
        .map(release => release.producers
          .filter(p => p.isDeveloper)
          .map(p => p.name))
        .flat()));
    }
    return [];
  };

  const developers = fillDevelopers(releases);
  const publishers = fillPublishers(releases, visualNovel);

  const vnTags = visualNovel?.tags ?? [];
  const { data: tags } = useExtendedTagsQuery(id, vnTags, {
    enabled: vnTags.length > 0,
  });

  const { data: characters } = useCharactersQuery(id);

  const staffBlock = Object.keys(STAFF_ROLES).map(key => (
    visualNovel && visualNovel.staff.filter(s => s.role === key).length > 0 && (
      <TagBlock
        key={key}
        title={STAFF_ROLES[key as StaffRoles].title}
        tags={visualNovel.staff.filter(staff => staff.role === key).map(staff => {
          const data = { name: staff.name };
          if (STAFF_ROLES[key as StaffRoles].showNote) {
            return { ...data, note: staff.note };
          }
          return data;
        })}
      />
    )
  ));

  const settingsContext = useSettingsContext();

  /**
   * Filter tags by category and spoiler level.
   */
  function tagsFilterPredicate(tag: ExtendedTag): boolean {
    return settingsContext.showTags[tag.cat] && tag.spoilerLevel <= settingsContext.spoilerLevel;
  }

  /** TODO: Replace it when loading wrapper will be implemented. */
  if (isLoading || isReleasesLoading) {
    return <>Loading...</>;
  }

  /** TODO: Replace it when error wrapper will be implemented. */
  if (error) {
    return <>{`An error has occurred: ${error.message}`}</>;
  }

  return (
    <div className={cls.page}>
      <div className={cls.sidebar}>
        {visualNovel?.length && (
          <TagBlock title="Game Length" tags={[{ name: visualNovel.length }]} />
        )}
        <TagBlock
          title="Developers"
          tags={developers.map(dev => ({ name: dev }))}
        />
        {visualNovel?.languages.map(key => (
          <Fragment key={key}>
            {publishers && publishers[key].length > 0 && (
              <TagBlock
                title={`Publisher (${languageCodes.getName(key)})`}
                tags={publishers[key].map(publisher => ({ name: publisher }))}
              />
            )}
          </Fragment>
        ))}
        <div>
          <Heading as="h3" size="sm">
            Links
          </Heading>
          <div className={cls.items}>
            {visualNovel && (
              Object.keys(visualNovel.links).map(key => (
                <Link
                  key={key}
                  className={cls.link}
                  href={visualNovel.links[key as keyof VisualNovelLinks] ?? '#'}
                >
                  {key}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <div>
        {
          tags && tags.length > 0 && (
            <TagBlock
              title="Tags"
              tags={tags.filter(tagsFilterPredicate).map(tag => ({ name: tag.name }))}
              isExpandable
            />
          )
        }
        <div className={cls.staff}>
          {staffBlock}
        </div>
        <div>
          <Heading as="h3" size="sm">
            Characters
          </Heading>
          <div className={cls.characters}>
            {characters && characters.length > 0 && (
              characters.map(character => (
                <Fragment key={character.id}>
                  <CharacterCard
                    character={character}
                  />
                </Fragment>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
