import React, { ReactElement, VFC } from 'react';

import { parse, ast, ast_item, ast_to_array } from '@prekel/rescript-bbcode/src/BBCode.gen';
import { Box, Link, Text } from '@chakra-ui/react';

/**
 * Transforms AST to React element array through astItemToElement function.
 * @param parsed Parsed representation of BBCoded-text (AST).
 */
const mapAstToElements = (parsed: ast): ReactElement[] => {
  /**
   * Transforms AST item to corresponding React element.
   * @param astItem An AST item.
   * @param index Index which used in key.
   */
  const astItemToElement = (astItem: ast_item, index: number): ReactElement => {
    const itemKey = `${astItem.tag}${index.toString()}`;
    switch (astItem.tag) {
      case 'Text': return <Text key={itemKey} as="span">{astItem.value}</Text>;
      case 'Bold': return <Text key={itemKey} as="b">{mapAstToElements(astItem.value.children)}</Text>;
      case 'Italic': return <Text key={itemKey} as="i">{mapAstToElements(astItem.value.children)}</Text>;
      case 'Underline': return <Text key={itemKey} as="u">{mapAstToElements(astItem.value.children)}</Text>;
      case 'Strikethrough': return <Text key={itemKey} as="s">{mapAstToElements(astItem.value.children)}</Text>;
      case 'Link': return <Link key={itemKey} href={astItem.value.url} isExternal />;
      case 'LinkNamed':
        // TODO: Handle vndb-relative url (like "/v3126").
        return <Link key={itemKey} href={astItem.value.url} isExternal>{mapAstToElements(astItem.value.children)}</Link>;
      case 'Spoiler':
        // TODO: Display spoiler vir Chakra components.
        return <details key={itemKey}>{mapAstToElements(astItem.value.children)}</details>;
      default:
        return <Box key={itemKey}>{astItem}</Box>;
    }
  };
  return ast_to_array(parsed).map((item, index) => astItemToElement(item, index));
};

/**
 * Trying to parse text to AST.
 * @param text Input.
 */
const tryParse = (text: string): ast | null => {
  try {
    const parsed = parse(text);
    return parsed ?? null;
  } catch {
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
  const parsed = tryParse(text);
  if (parsed) {
    return <Box>{mapAstToElements(parsed)}</Box>;
  }
  return <Text>{text}</Text>;
};
