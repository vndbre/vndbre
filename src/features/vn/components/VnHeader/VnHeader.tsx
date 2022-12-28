import type { FC } from 'react';
import React, { useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from '../../../../components/Button/Button';
import { ButtonGroup } from '../../../../components/ButtonGroup/ButtonGroup';
import { IconButton } from '../../../../components/IconButton/IconButton';
import { Poster } from '../../../../components/Poster/Poster';
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
    <header className="w-full flex gap-6 items-stretch">
      <div className="w-full flex flex-col gap-8 md:gap-4">
        <div className="flex gap-6 items-stretch">
          <div className="w-full flex flex-col md:flex-row gap-4 items-start justify-between">
            <hgroup className="flex flex-col gap-2 items-start">
              <h1 className="text-lg leading-8 tracking-tight font-bold line-clamp-2">{titleEnglish}</h1>
              <h2 className="text-base leading-6 line-clamp-1">{titleRomaji}</h2>
            </hgroup>
            <div className="flex gap-2 items-center flex-row-reverse md:flex-row">
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
              className="h-32 block md:hidden"
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
            className="h-32 hidden md:block"
          />
        </motion.div>
      )}
    </header>
  );
};

export const VnHeader = memo(VnHeaderComponent);
