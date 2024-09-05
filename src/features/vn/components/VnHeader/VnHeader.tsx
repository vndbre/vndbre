'use client';

import type { FC } from 'react';
import { useRef, useCallback, memo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/Button/Button';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { Poster, POSTER_RATIO } from '@/components/Poster/Poster';
import { IconButton } from '@/components/IconButton/IconButton';

import { useElementSize } from '@/hooks/useElementSize';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import type { TabValue } from '../VnHeaderTabs/VnHeaderTabs';
import { VnHeaderTabs } from '../VnHeaderTabs/VnHeaderTabs';
import { useVnInfoQuery } from '../../queries/vnInfo';

interface Props {

  /** Whether to disable appearance animations. */
  readonly disableAppearanceAnimation?: boolean;

  /** Vn id. */
  readonly id: string;
}

/** Vn header. */
const VnHeaderComponent: FC<Props> = ({
  disableAppearanceAnimation,
  id,
}) => {
  const router = useRouter();
  const pathname = usePathname() ?? '';

  const handleTabChange = useCallback((tabName: TabValue) => {
    router.push(`/vn/${id}/${tabName}`);
  }, [id]);

  const desktopParentRef = useRef<HTMLDivElement | null>(null);
  const mobileParentRef = useRef<HTMLDivElement | null>(null);
  const { height: desktopParentHeight } = useElementSize(desktopParentRef);
  const { height: mobileParentHeight } = useElementSize(mobileParentRef);

  const isMobileLayout = !useBreakpoint('md');
  const parentHeight = isMobileLayout ? mobileParentHeight : desktopParentHeight;

  const { data: vnInfo, isLoading } = useVnInfoQuery(id);
  if (vnInfo == null || isLoading) {
    return <div>loading header</div>;
  }

  const minHeight = vnInfo.titleAlt == null ? 112 : 128;
  const posterHeight = parentHeight || minHeight;

  const activeTabValue = pathname.split('/').at(-1) as TabValue;
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
          <div ref={mobileParentRef} className={cn('flex w-full flex-col items-start justify-between gap-4 md:flex-row')}>
            <hgroup className="flex flex-col items-start gap-2">
              <h1 className="text-title-24 line-clamp-2">{vnInfo.titleEnglish}</h1>
              <h2 className="text-caption-20 line-clamp-1">
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
              priority
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
          initial={disableAppearanceAnimation ? {} : { rotate: 180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Poster
            priority
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
