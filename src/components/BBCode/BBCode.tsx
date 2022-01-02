import React, { ReactElement, VFC } from 'react';

import { parse, ast, ast_item, ast_to_array } from '@prekel/rescript-bbcode/src/BBCode.gen';
import { Box, Link, Text } from '@chakra-ui/react';
import cls from './BBCode.module.css';

/**
 * Transforms AST to React element array through astItemToElement function.
 * @param parsed Parsed representation of BBCode-text (AST).
 */
const mapAstToElements = (parsed: ast): ReactElement[] => {
  /**
   * Transforms AST item to corresponding React element.
   * @param astItem An AST item.
   * @param index Index which used in key.
   */
  const mapAstItemToElement = (astItem: ast_item, index: number): ReactElement => {
    const itemKey = `${astItem.tag}${index.toString()}`;
    switch (astItem.tag) {
      case 'Text': return <Text key={itemKey} as="span" className={cls.text}>{astItem.value}</Text>;
      case 'Bold': return <Text key={itemKey} as="b">{mapAstToElements(astItem.value.children)}</Text>;
      case 'Italic': return <Text key={itemKey} as="i">{mapAstToElements(astItem.value.children)}</Text>;
      case 'Underline': return <Text key={itemKey} as="u">{mapAstToElements(astItem.value.children)}</Text>;
      case 'Strikethrough': return <Text key={itemKey} as="s">{mapAstToElements(astItem.value.children)}</Text>;
      case 'Link': return <Link key={itemKey} href={astItem.value.url} isExternal />;
      case 'LinkNamed':
        // TODO: Handle vndb-relative url (like "/v3126").
        return <Link key={itemKey} href={astItem.value.url} isExternal>{mapAstToElements(astItem.value.children)}</Link>;
      case 'Spoiler':
        // TODO: Display spoiler via Chakra components.
        return <details key={itemKey}>{mapAstToElements(astItem.value.children)}</details>;
      default:
        throw Error(`Unexpected ${JSON.stringify(astItem)}`);
    }
  };
  return ast_to_array(parsed).map((item, index) => mapAstItemToElement(item, index));
};

/**
 * Tries to parse BBCode-text to AST and display then to React Elements.
 * If failure, return `null` and log warn.
 * @param text Input (BBCode-text).
 */
const displayBBCode = (text: string): ReactElement[] | null => {
  try {
    const parsed = parse(text);
    if (!parsed) {
      // eslint-disable-next-line no-console
      console.warn('Cannot parse');
      return null;
    }
    return mapAstToElements(parsed);
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.warn('Cannot parse or display:', err);
    return null;
  }
};

interface Props {

  /**
   * BBCode-text which must be parsed and displayed.
   */
  text: string;
}

/**
 * BBCode component.
 */
export const BBCode: VFC<Props> = ({ text }) => {
  const bb = displayBBCode(text);
  if (bb) {
    return <Box>{bb}</Box>;
  }
  return <Text>{text}</Text>;
};
