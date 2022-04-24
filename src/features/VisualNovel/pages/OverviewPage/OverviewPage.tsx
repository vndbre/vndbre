import React, { FC, useMemo } from 'react';
import { Heading, Link } from '@chakra-ui/react';

import cls from './OverviewPage.module.css';
import { CharacterCard } from '../../components/CharacterCard/CharacterCard';
import { useVisualNovelQuery, useCharactersQuery, useReleasesQuery, useExtendedTagsQuery } from '../../queries';
import { Release } from '../../../../models/releases/release';
import { VisualNovel } from '../../../../models/visualNovels/visualNovel';
import { useSettingsContext } from '../../../../providers';
import { ContentWrapper, TagList } from '../../../../components';
import { Icon } from '../../../../components/Icon/Icon';
import { VisualNovelRouteParams } from '../../utils/visualNovelRouteParams';
import { useRouteParams } from '../../../../hooks/useRouterParams';
import { Language } from '../../../../models/language';
import { StaffRole } from '../../../../models/staffRole';

const MAX_CHARACTER_AMOUNT = 6;

/**
 * Overview tab page.
 */
export const OverviewPage: FC = () => {
  const { id } = useRouteParams<VisualNovelRouteParams>();
  const { isLoading, error, data: visualNovel } = useVisualNovelQuery(Number(id));

  const {
    isLoading: isReleasesLoading,
    data: releases,
    error: releasesError,
  } = useReleasesQuery(Number(id));

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
          if (vnData.languages.includes(lang)) {
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
  const { data: tags, isLoading: isTagsLoading, error: tagsError } = useExtendedTagsQuery(id, vnTags, {
    enabled: vnTags.length > 0,
  });

  const { data: characters, isLoading: isCharactersLoading, error: charactersError } = useCharactersQuery(Number(id));
  const { tagsVisibility, spoilerLevel } = useSettingsContext();

  const publishersBlock = visualNovel?.languages.map(key => (
    publishers && publishers[key].length > 0 && (
      <TagList
        key={key}
        title={Language.toReadable(Language.toLanguage(key))}
        titleIcon={<Icon name={Language.getIcon(Language.toLanguage(key))} />}
        tags={publishers[key].map(publisher => ({ name: publisher, note: null }))}
      />
    )
  ));

  const linksBlock = visualNovel && (
    Object.entries(visualNovel.links).map(([key, value]) => (
      <Link
        key={key}
        className={cls.link}
        href={value ?? '#'}
      >
        {key}
      </Link>
    ))
  );

  const staffBlock = Object.keys(StaffRole.getStaffRolesInformation()).map(key => (
    visualNovel && visualNovel.staff.filter(s => s.role === key).length > 0 && (
      <TagList
        key={key}
        title={StaffRole.getStaffRoleInfo(key as StaffRole).title}
        tags={visualNovel.staff.filter(staff => staff.role === key).map(staff => {
          const data = { name: staff.name, note: null, path: `/staff/${staff.staffId}` };
          if (StaffRole.getStaffRoleInfo(key as StaffRole).shouldNoteBeDisplayed) {
            return { ...data, note: staff.note };
          }
          return data;
        })}
      />
    )
  ));

  const tagsBlock = useMemo(() => {
    if (tags != null && tags.length > 0) {
      return (
        <TagList
          title="Tags"
          tags={tags
            .filter(tag => tagsVisibility[tag.cat] && tag.spoilerLevel <= spoilerLevel)
            .map(tag => ({ name: tag.name, note: null }))}
          isExpandable
        />
      );
    }

    return null;
  }, [tags, tagsVisibility, spoilerLevel]);

  const charactersBlock = characters && characters.length > 0 && (
    characters.slice(0, MAX_CHARACTER_AMOUNT).map(character => (
      <CharacterCard
        key={character.id}
        character={character}
      />
    ))
  );

  return (
    <ContentWrapper isLoading={isLoading} error={error}>
      <div className={cls.page}>
        <ContentWrapper isLoading={isReleasesLoading} error={releasesError}>
          <div className={cls.sidebar}>
            {visualNovel?.length && (
              <TagList title="Game Length" tags={[{ name: visualNovel.length, note: null }]} />
            )}
            <TagList
              title="Developers"
              tags={developers.map(dev => ({ name: dev, note: null }))}
            />
            {publishersBlock}
            <div>
              <Heading as="h3" size="sm">
                Links
              </Heading>
              <div className={cls.items}>
                {linksBlock}
              </div>
            </div>
          </div>
        </ContentWrapper>
        <div>
          <ContentWrapper isLoading={isTagsLoading} error={tagsError}>
            {tagsBlock}
          </ContentWrapper>
          <div className={cls.staff}>
            {staffBlock}
          </div>
          <ContentWrapper isLoading={isCharactersLoading} error={charactersError}>
            {characters != null && characters.length > 0 && (
              <div>
                <Heading as="h3" size="sm">
                  Characters
                </Heading>
                <div className={cls.characters}>
                  {charactersBlock}
                </div>
              </div>
            )}
          </ContentWrapper>
        </div>
      </div>
    </ContentWrapper>
  );
};
