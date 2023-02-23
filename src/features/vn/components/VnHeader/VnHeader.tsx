import type { FC } from 'react';
import React, { useRef, useCallback, memo } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'src/components/Button/Button';
import { ButtonGroup } from 'src/components/ButtonGroup/ButtonGroup';
import { Poster, POSTER_RATIO } from 'src/components/Poster/Poster';
import { IconButton } from 'src/components/IconButton/IconButton';

import { useElementSize } from 'src/hooks/useElementSize';
import clsx from 'clsx';
import { useBreakpoint } from 'src/hooks/useBreakpoint';
import { motion } from 'framer-motion';
import type { TabValue } from '../VnHeaderTabs/VnHeaderTabs';
import { VnHeaderTabs } from '../VnHeaderTabs/VnHeaderTabs';
import { useVnInfoQuery } from '../../queries/vnInfo';

/** Vn header. */
const VnHeaderComponent: FC = () => {
  const router = useRouter();

  const handleTabChange = useCallback((tabName: TabValue) => {
    router.push({
      pathname: `./${tabName}`,
      query: { id: router.query.id },
    }, undefined, { shallow: true });
  }, [router.query.id]);

  const desktopParentRef = useRef<HTMLDivElement | null>(null);
  const mobileParentRef = useRef<HTMLDivElement | null>(null);
  const { height: desktopParentHeight } = useElementSize(desktopParentRef);
  const { height: mobileParentHeight } = useElementSize(mobileParentRef);

  const isMobileLayout = !useBreakpoint('md');
  const parentHeight = isMobileLayout ? mobileParentHeight : desktopParentHeight;

  const { data: vnInfo, isLoading } = useVnInfoQuery(String(router.query.id));
  if (vnInfo == null || isLoading) {
    return <div>loading header</div>;
  }

  const minHeight = vnInfo.titleAlt == null ? 112 : 128;
  const posterHeight = parentHeight || minHeight;

  const activeTabValue = router.route.split('/').at(-1) as TabValue;
  const isPosterVisible = (activeTabValue !== 'overview' && vnInfo.imageUrl && parentHeight !== 0);

  /**
   * Get buttons width.
   * Setting buttons width so content doesn't jump when poster appear on the right.
   */
  const getButtonsWidth = (): number => {
    const smallButtonsWidth = 208;
    const gap = 24;
    const maxHeaderHeight = 160;
    const maxPosterWidth = smallButtonsWidth + gap + maxHeaderHeight * POSTER_RATIO;
    const posterWidth = posterHeight * POSTER_RATIO;

    if (isPosterVisible) {
      return maxPosterWidth - gap - posterWidth;
    }
    return maxPosterWidth;
  };

  return (
    <header className="flex w-full items-center justify-center gap-6">
      <div
        ref={desktopParentRef}
        id="vn-header-element"
        className="flex w-full flex-col gap-8 md:gap-4"
      >
        <div className="flex items-start gap-6">
          <div ref={mobileParentRef} className={clsx('flex w-full flex-col items-start justify-between gap-4 md:flex-row')}>
            <hgroup className="flex flex-col items-start gap-2">
              <h1 className="line-clamp-2 text-title-1">{vnInfo.titleEnglish}</h1>
              <h2 className="line-clamp-1 text-caption-20">
                {vnInfo.titleAlt}
              </h2>
            </hgroup>
            <div
              className="flex flex-row-reverse items-center justify-end gap-2 md:flex-row"
              style={{
                width: isMobileLayout ? '100%' : getButtonsWidth(),
              }}
            >
              <IconButton name="ellipsis" intent="tertiary" />
              <IconButton name="star" intent="tertiary" />
              <ButtonGroup>
                {isPosterVisible && !isMobileLayout ? (
                  <IconButton name="bookmark" intent="primary" />
                ) : (
                  <Button hasSmallPaddings intent="primary">Add to list</Button>
                )}
                <IconButton name="chevron-down" intent="primary" />
              </ButtonGroup>
            </div>
          </div>
          {isPosterVisible && (
            <Poster
              src={vnInfo.imageUrl}
              alt="Cut girl sitting"
              className="md:hidden"
              height={posterHeight}
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
          initial={{ rotate: 180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Poster
            src={vnInfo.imageUrl}
            alt="Cute girl sitting"
            className="max-md:hidden"
            height={posterHeight}
          />
        </motion.div>
      )}
    </header>
  );
};

export const VnHeader = memo(VnHeaderComponent);
