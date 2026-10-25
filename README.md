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

### Development

```bash
npm test
npm run check
npm run build
```

[Mantine]: https://mantine.dev/
