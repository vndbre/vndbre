import React, { FC } from 'react';

import { parse, ast, ast_item, ast_to_array } from 'rescript-bbcode/src/BBCode.gen';
import { Link } from '@chakra-ui/react';

/**
 * Transforms AST to React element array through astItemToElement function.
 * @param a AST.
 * @returns React element array.
 */
// eslint-disable-next-line @typescript-eslint/no-use-before-define
const astToElement = (a: ast): JSX.Element[] => ast_to_array(a).map(astItemToElement);

/**
 * Transforms AST item to corresponding React element.
 * @param astItem AST item.
 * @returns React element.
 */
const astItemToElement = (astItem: ast_item): JSX.Element => {
  switch (astItem.tag) {
    case 'Text': return <span key={astItem.value.substring(0, 10)}>{astItem.value}</span>;
    case 'Bold': return <b key="b">{astToElement(astItem.value.children)}</b>;
    case 'Italic': return <i key="i">{astToElement(astItem.value.children)}</i>;
    case 'Link': return <Link key={astItem.value.url} href={astItem.value.url} isExternal />;
    case 'LinkNamed':
      return <Link key={astItem.value.url} href={astItem.value.url} isExternal>{astToElement(astItem.value.children)}</Link>;
    default:
      return <div key="default">{astItem}</div>;
  }
};

/**
 * Trying to parse text to AST.
 * @param text Input.
 * @returns AST or `null` if failure.
 */
const tryParse = (text: string): ast | null => {
  try {
    const parsed = parse(text);
    if (parsed === undefined) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

interface Props {

  /**
   * BBCode-text which must be parsed and displayed.
   */
  children: string;
}

/**
 * BBCode component.
 */
export const BBCode: FC<Props> = ({ children }) => {
  const parsed = tryParse(children);
  if (parsed) {
    return <div>{astToElement(parsed)}</div>;
  }
  return <div>{children}</div>;
};
