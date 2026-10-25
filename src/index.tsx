import { useMDXComponents as useProviderComponents } from '@mdx-js/react';
import type { MDXComponents } from 'mdx/types.js';
import { MdxCode, MdxPre } from './components/code';
import { MdxLi, MdxOl, MdxUl } from './components/lists';
import { MdxImg, MdxInput } from './components/media';
import { MdxTable, MdxTableParts } from './components/tables';
import { MdxHeading, MdxTypography, MdxWrapper } from './components/typography';

const headings = {
  h1: (props: Record<string, unknown>) => <MdxHeading order={1} {...props} />,
  h2: (props: Record<string, unknown>) => <MdxHeading order={2} {...props} />,
  h3: (props: Record<string, unknown>) => <MdxHeading order={3} {...props} />,
  h4: (props: Record<string, unknown>) => <MdxHeading order={4} {...props} />,
  h5: (props: Record<string, unknown>) => <MdxHeading order={5} {...props} />,
  h6: (props: Record<string, unknown>) => <MdxHeading order={6} {...props} />,
};

/**
 * Mantine components mapped to standard Markdown/MDX elements.
 */
export const mantineMdxComponents: MDXComponents = {
  wrapper: MdxWrapper,
  ...headings,
  ...MdxTypography,
  code: MdxCode,
  li: MdxLi,
  ol: MdxOl,
  pre: MdxPre,
  table: MdxTable,
  ul: MdxUl,
  ...MdxTableParts,
  img: MdxImg,
  input: MdxInput,
};

/**
 * Merge the default mappings with per-app component overrides.
 */
export function createMantineMdxComponents(
  overrides?: MDXComponents,
): MDXComponents {
  return { ...mantineMdxComponents, ...overrides };
}

/**
 * MDX provider hook used by `providerImportSource`.
 */
export function useMDXComponents(
  components?: Readonly<MDXComponents> | null,
): MDXComponents {
  const providerComponents = useProviderComponents(components);

  return {
    ...mantineMdxComponents,
    ...providerComponents,
  };
}

export default mantineMdxComponents;
