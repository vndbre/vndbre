import React, { memo, VFC } from 'react';
import { HStack, Link } from '@chakra-ui/react';
import { ExternalLink } from '../../models/externalLink';

interface Props {

  /** Object with staff links. */
  readonly links: readonly ExternalLink[];
}

/** Staff links component. */
const EntityLinksComponent: VFC<Props> = ({ links }) => (
  <HStack display="inline">
    {links.map(link => (
      <Link textTransform="capitalize" key={link.label} href={link.href}>
        {link.label}
      </Link>
    ))}
  </HStack>
);

export const EntityLinks = memo(EntityLinksComponent);
