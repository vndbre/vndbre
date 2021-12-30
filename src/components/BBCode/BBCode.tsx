import React, { FC } from 'react';

import BBCodeUntyped from '@bbob/react/es/Component';
import reactPreset from '@bbob/preset-react/es';

import { make as Stub } from 'rescript-bbcode/src/Stub.gen';
import { parse, ast, ast_item, ast_to_array } from 'rescript-bbcode/src/BBCode.gen';
import cls from './BBCode.module.css';
import { Link } from '@chakra-ui/react';

const astToElement = (a: ast) => {
  return <>{ast_to_array(a).map(astItemToElement)}</>
}

const astItemToElement = (as: ast_item) => {
  switch (as.tag) {
    case "Text": return <span>{as.value}</span>;
    case "Bold": return <b>{astToElement(as.value.children)}</b>;
    case "Italic": return <i>{astToElement(as.value.children)}</i>;
    case "Link": return <a href={as.value.url} />;
    case "LinkNamed": return <Link href={as.value.url} isExternal>{astToElement(as.value.children)}</Link>;
    default: <div></div>;
  }
}

/**
 * Typed BBCode component.
 */
export const BBCode: FC<{ text: string }> = ({ text }) => {
  console.log(text);
  const parsed = parse(text);
  console.log(parsed);
  if (parsed) {
    return <div>{astToElement(parsed)}</div>;
  }
  else return <>{"fail"}</>
};
