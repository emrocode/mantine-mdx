import {
  Anchor,
  Blockquote,
  Divider,
  Kbd,
  Mark,
  Text,
  Title,
  Typography,
} from '@mantine/core';
import type { ReactNode } from 'react';

type MdxProps = Record<string, unknown>;

export function MdxWrapper({
  children,
  ...props
}: { children?: ReactNode } & MdxProps) {
  return <Typography {...props}>{children}</Typography>;
}

export function MdxHeading({
  order,
  ...props
}: MdxProps & { order: 1 | 2 | 3 | 4 | 5 | 6 }) {
  return <Title order={order} {...props} />;
}

export const MdxTypography = {
  a: (props: MdxProps) => <Anchor {...props} />,
  b: (props: MdxProps) => <Text component="b" fw={700} {...props} />,
  blockquote: (props: MdxProps) => <Blockquote {...props} />,
  del: (props: MdxProps) => (
    <Text component="del" td="line-through" {...props} />
  ),
  em: (props: MdxProps) => <Text component="em" {...props} />,
  hr: (props: MdxProps) => <Divider my="md" {...props} />,
  i: (props: MdxProps) => <Text component="i" {...props} />,
  ins: (props: MdxProps) => <Text component="ins" {...props} />,
  kbd: (props: MdxProps) => <Kbd {...props} />,
  mark: (props: MdxProps) => <Mark {...props} />,
  p: (props: MdxProps) => <Text {...props} />,
  s: (props: MdxProps) => <Text component="s" td="line-through" {...props} />,
  strong: (props: MdxProps) => <Text component="strong" fw={700} {...props} />,
  sub: (props: MdxProps) => <Text component="sub" {...props} />,
  sup: (props: MdxProps) => <Text component="sup" {...props} />,
  u: (props: MdxProps) => <Text component="u" {...props} />,
};
