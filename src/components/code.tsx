import { CodeHighlight } from '@mantine/code-highlight';
import { Code } from '@mantine/core';
import type * as React from 'react';
import { Children, isValidElement } from 'react';

type CodeElementProps = {
  className?: string;
  children?: React.ReactNode;
};

function getCodeLanguage(className?: string): string | undefined {
  return /language-([\w-]+)/.exec(className ?? '')?.[1];
}

function extractCodeText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number' || typeof node === 'bigint') return String(node);
  if (Array.isArray(node)) return node.map(extractCodeText).join('');
  if (isValidElement(node)) {
    return extractCodeText((node.props as CodeElementProps).children);
  }
  return '';
}

export function MdxPre(props: Record<string, unknown>) {
  const { children, ...rest } = props;
  const first = Children.toArray(children as React.ReactNode)[0];

  if (isValidElement(first)) {
    const codeProps = (first.props ?? {}) as CodeElementProps;
    const code = extractCodeText(codeProps.children);

    if (code) {
      return (
        <CodeHighlight
          code={code.replace(/\n$/, '')}
          data-mdx-code-block=""
          language={getCodeLanguage(codeProps.className)}
          {...rest}
        />
      );
    }
  }

  return <pre {...props} />;
}

export function MdxCode(props: Record<string, unknown>) {
  return <Code {...props} />;
}
