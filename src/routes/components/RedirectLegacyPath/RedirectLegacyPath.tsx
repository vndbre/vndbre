import React, { memo, VFC } from 'react';
import { Navigate } from 'react-router';
import { useRouteParams } from '../../../hooks';

interface Props {

  /** New path. */
  readonly to: string;
}

/**
 * Redirects to given path with `id` property.
 * Serves as `vndb` legacy path handler.
 */
const RedirectLegacyPathComponent: VFC<Props> = ({ to }) => {
  const { id } = useRouteParams<{ id: string; }>();
  return (
    <Navigate replace to={`/${to}/${id}`} />
  );
};

export const RedirectLegacyPath = memo(RedirectLegacyPathComponent);
