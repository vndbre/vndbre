import React, { VFC, memo, ReactNode } from 'react';
import { Error } from '../Error/Error';
import { Loading } from '../Loading/Loading';

interface Props {

  /** Is data loading. */
  isLoading: boolean;

  /** Children node. */
  children: ReactNode;

  /** Error object. */
  error?: Error | null;
}

/**
 * Wraps content with loading and error components.
 * Depending on these states it will give a correct feedback.
 * Each of containing blocks can be used separately.
 */
const ContentWrapperComponent: VFC<Props> = ({ isLoading, error = null, children }) => {
  if (error) {
    return <Error error={error} />;
  }

  return <Loading isLoading={isLoading}>{children}</Loading>;
};

export const ContentWrapper = memo(ContentWrapperComponent);
