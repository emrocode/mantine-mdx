# Mantine MDX

🌿 A small MDX component mapping for rendering Markdown content with
[Mantine] components.

### 📦 Installation

```bash
npm install @emrocode/mantine-mdx @mantine/core @mantine/code-highlight
```

### ⚙️ Setup

Wrap your MDX content with `MDXProvider`:

```tsx
import { MantineProvider } from '@mantine/core';
import { MDXProvider } from '@mdx-js/react';
import { mantineMdxComponents } from '@emrocode/mantine-mdx';
import Document from './document.mdx';

export function App() {
  return (
    <MantineProvider>
      <MDXProvider components={mantineMdxComponents}>
        <Document />
      </MDXProvider>
    </MantineProvider>
  );
}
```

The mapping includes headings, typography, lists, tables, images, inputs,
inline code, and fenced code blocks.

> For `MDXProvider` to work, configure your MDX compiler with
> `providerImportSource: '@mdx-js/react'`.

### Custom components

Create a custom mapping by overriding only the components you need:

```tsx
import { createMantineMdxComponents } from '@emrocode/mantine-mdx';

const components = createMantineMdxComponents({
  h1: (props) => <h1 {...props} data-custom="true" />,
});
```

For MDX files using `providerImportSource`, use the provided hook:

```tsx
import { useMDXComponents } from '@emrocode/mantine-mdx';

export function CustomMdxComponents() {
  return useMDXComponents({
    strong: (props) => <strong {...props} />,
  });
}
```

### GitHub alerts

GitHub alert blockquotes are supported through the `remarkGithubAlerts`
plugin. Add it to your MDX compiler:

```ts
import mdx from '@mdx-js/rollup';
import { remarkGithubAlerts } from '@emrocode/mantine-mdx';

export default {
  plugins: [mdx({ remarkPlugins: [remarkGithubAlerts] })],
};
```

Alerts are rendered with the Mantine `Blockquote` component:

```md
> [!NOTE]
> Useful information.
```

To customize an alert, override `blockquote` and reuse `MdxBlockquote`:

```tsx
import {
  createMantineMdxComponents,
  MdxBlockquote,
} from '@emrocode/mantine-mdx';
import { Blockquote } from '@mantine/core';

const components = createMantineMdxComponents({
  blockquote: ({ 'data-alert-type': type, ...props }) =>
    type === 'warning' ? (
      <Blockquote color="orange" {...props} />
    ) : (
      <MdxBlockquote data-alert-type={type} {...props} />
    ),
});
```

The default alert colors and titles are exported as `mantineMdxAlerts`.

### Development

```bash
npm test
npm run check
npm run build
```

[Mantine]: https://mantine.dev/
