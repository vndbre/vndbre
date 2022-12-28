import type { FC } from 'react';
import React, { useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from 'src/components/Button/Button';
import { ButtonGroup } from 'src/components/ButtonGroup/ButtonGroup';
import { Poster } from 'src/components/Poster/Poster';
import { IconButton } from 'src/components/IconButton/IconButton';
import type { TabValue } from '../VnHeaderTabs/VnHeaderTabs';
import { VnHeaderTabs } from '../VnHeaderTabs/VnHeaderTabs';

interface Props {

  /** English title. */
  readonly titleEnglish: string;

  /** Romaji title. */
  readonly titleRomaji: string;

  /** Poster src. */
  readonly posterSrc: string;

  /** Whether header has route transition animation of poster. */
  readonly hasTransitionAnimations?: boolean;
}

/** Vn header. */
const VnHeaderComponent: FC<Props> = ({
  titleEnglish,
  titleRomaji,
  posterSrc,
  hasTransitionAnimations: hasAnimations = false,
}) => {
  const router = useRouter();
  const activeTabValue = router.route.split('/').at(-1) as TabValue;

  const isPosterVisible = activeTabValue !== 'overview';

  const handleTabChange = useCallback((tabName: TabValue) => {
    router.push({
      pathname: `./${tabName}`,
      query: { id: router.query.id },
    });
  }, [router.query.id]);

  return (
    <header className="flex w-full items-stretch gap-6">
      <div className="flex w-full flex-col gap-8 md:gap-4">
        <div className="flex items-stretch gap-6">
          <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row">
            <hgroup className="flex flex-col items-start gap-2">
              <h1 className="line-clamp-2 text-lg font-bold leading-8 tracking-tight">{titleEnglish}</h1>
              <h2 className="line-clamp-1 text-base leading-6">{titleRomaji}</h2>
            </hgroup>
            <div className="flex flex-row-reverse items-center gap-2 md:flex-row">
              <IconButton name="edit" intent="tertiary" />
              <IconButton name="star" intent="tertiary" />
              <IconButton name="flag" intent="tertiary" />
              <ButtonGroup>
                <Button hasSmallPaddings intent="secondary">Add to list</Button>
                <IconButton name="chevron-down" intent="secondary" />
              </ButtonGroup>
            </div>
          </div>
          {isPosterVisible && (
            <Poster
              src={posterSrc}
              alt="Cut girl sitting"
              className="block h-32 md:hidden"
            />
          )}
        </div>
        <VnHeaderTabs
          value={activeTabValue}
          onChange={handleTabChange}
        />
      </div>
      {isPosterVisible && (
        <motion.div
          layoutId="poster"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ bounce: false, duration: hasAnimations ? 0.3 : 0 }}
        >
          <Poster
            src={posterSrc}
            alt="Cute girl sitting"
            className="hidden h-32 md:block"
          />
        </motion.div>
      )}
    </header>
  );
};

export const VnHeader = memo(VnHeaderComponent);
