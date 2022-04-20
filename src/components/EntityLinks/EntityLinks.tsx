import React, { memo, VFC } from 'react';
import { HStack, Link } from '@chakra-ui/react';
import { Links } from '../../models/links';

interface Props {

  /** Object with staff links. */
  readonly links: Links;
}

/** Staff links component. */
const EntityLinksComponent: VFC<Props> = ({ links }) => {
  const linksList = Object.entries(links).map(([key, path]) => path && <Link key={key} href={path}>{key}</Link>);

  return (
    <HStack display="inline">{linksList}</HStack>
  );
};

export const EntityLinks = memo(EntityLinksComponent);
