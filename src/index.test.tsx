import { MantineProvider } from '@mantine/core';
import { MDXProvider } from '@mdx-js/react';
import type { ComponentType } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { MdxPre } from './components/code';
import {
  createMantineMdxComponents,
  mantineMdxComponents,
  useMDXComponents,
} from './index';

function render(
  name: keyof typeof mantineMdxComponents,
  props: Record<string, unknown>,
) {
  const Component = mantineMdxComponents[name] as ComponentType<
    Record<string, unknown>
  >;
  return renderToStaticMarkup(
    <MantineProvider>
      <Component {...props} />
    </MantineProvider>,
  );
}

function RenderProviderMark() {
  const components = useMDXComponents();
  const Mark = components.mark as ComponentType<Record<string, unknown>>;
  return <Mark>Custom mark</Mark>;
}

function RenderDirectMark() {
  const components = useMDXComponents({
    mark: (props) => <mark data-custom="true" {...props} />,
  });
  const Mark = components.mark as ComponentType<Record<string, unknown>>;
  return <Mark>Direct mark</Mark>;
}

describe('mantineMdxComponents', () => {
  it('maps Markdown elements to Mantine components', () => {
    for (const order of [1, 2, 3, 4, 5, 6] as const) {
      const heading = render(`h${order}`, { children: `Heading ${order}` });
      expect(heading).toContain(`Heading ${order}`);
      expect(heading).toContain(`data-order="${order}"`);
    }

    const cases = [
      ['p', 'Paragraph'],
      ['a', 'Link'],
      ['blockquote', 'Quote'],
      ['strong', 'Bold'],
      ['b', 'Bold element'],
      ['em', 'Emphasis'],
      ['i', 'Italic element'],
      ['del', 'Deleted'],
      ['s', 'Strike'],
      ['u', 'Underline'],
      ['ins', 'Inserted'],
      ['sup', 'Superscript'],
      ['sub', 'Subscript'],
      ['mark', 'Marked'],
      ['kbd', 'Ctrl'],
    ] as const;

    for (const [name, content] of cases) {
      expect(render(name, { children: content })).toContain(content);
    }
  });

  it('renders GitHub alerts with the Mantine Blockquote component', () => {
    const html = render('blockquote', {
      children: 'Alert body',
      'data-alert-type': 'note',
    });

    expect(html).toContain('mantine-Blockquote-root');
    expect(html).toContain('Note');
    expect(html).toContain('Alert body');
    expect(html).toContain('--bq-bd:var(--mantine-color-blue-filled)');
    expect(html).toContain('light-dark(color-mix(');
    expect(html).toContain('--mantine-color-blue-text');
  });

  it('supports custom component mappings', () => {
    const components = createMantineMdxComponents({
      h1: (props) => <h1 data-custom="true" {...props} />,
    });
    const Heading = components.h1 as ComponentType<Record<string, unknown>>;

    expect(renderToStaticMarkup(<Heading>Custom</Heading>)).toContain(
      'data-custom="true"',
    );
  });

  it('uses custom mappings from MDXProvider and direct overrides', () => {
    const providerHtml = renderToStaticMarkup(
      <MantineProvider>
        <MDXProvider
          components={{
            mark: (props) => <mark data-custom="true" {...props} />,
          }}
        >
          <RenderProviderMark />
        </MDXProvider>
      </MantineProvider>,
    );
    const directHtml = renderToStaticMarkup(
      <MantineProvider>
        <RenderDirectMark />
      </MantineProvider>,
    );

    expect(providerHtml).toContain('data-custom="true"');
    expect(providerHtml).toContain('Custom mark');
    expect(directHtml).toContain('data-custom="true"');
    expect(directHtml).toContain('Direct mark');
  });

  it('wraps content and handles special Markdown elements', () => {
    const Wrapper = mantineMdxComponents.wrapper as ComponentType<
      Record<string, unknown>
    >;
    const html = renderToStaticMarkup(
      <MantineProvider>
        <Wrapper>
          <h1>Title</h1>
          <p>Paragraph</p>
        </Wrapper>
      </MantineProvider>,
    );

    expect(html).toContain('mantine-Typography-root');
    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<p>Paragraph</p>');

    expect(render('hr', {})).toContain(
      'margin-block:var(--mantine-spacing-md)',
    );
    expect(render('ol', { children: 'Item', type: 'a' })).toContain(
      'list-style-type:lower-alpha',
    );
    expect(
      render('pre', {
        children: <code className="language-ts">{'const answer = 42;\n'}</code>,
      }),
    ).toContain('const answer = 42;');
    expect(render('img', { alt: 'Example', src: '/image.png' })).toContain(
      'src="/image.png"',
    );
    expect(render('input', { checked: true, type: 'checkbox' })).toContain(
      'type="checkbox"',
    );
    expect(
      render('table', {
        children: (
          <thead>
            <tr>
              <th>Header</th>
            </tr>
          </thead>
        ),
      }),
    ).toContain('Header');
  });

  it('adds code block spacing when another block follows', () => {
    const Wrapper = mantineMdxComponents.wrapper as ComponentType<
      Record<string, unknown>
    >;
    const html = renderToStaticMarkup(
      <MantineProvider>
        <Wrapper>
          <MdxPre>
            <code className="language-ts">{'const answer = 42;'}</code>
          </MdxPre>
          <p>Next paragraph</p>
        </Wrapper>
      </MantineProvider>,
    );

    expect(html).toContain('data-mantine-mdx-wrapper');
    expect(html).toContain('data-mdx-code-block');
    expect(html).toContain('[data-mdx-code-block]:has(+ *)');
  });
});
