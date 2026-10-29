import {
  Anchor,
  Blockquote,
  Divider,
  Kbd,
  type MantineColor,
  Mark,
  Text,
  Title,
  Typography,
} from '@mantine/core';
import type { ReactNode } from 'react';
import {
  type GithubAlertType,
  isGithubAlertType,
} from '../plugins/github-alerts';

type MdxProps = Record<string, unknown>;

const codeBlockSpacingStyles = `
  [data-mantine-mdx-wrapper] [data-mdx-code-block]:has(+ *) {
    margin-bottom: var(--mantine-spacing-md);
  }
`;

export const mantineMdxAlerts = {
  caution: { color: 'red', title: 'Caution' },
  important: { color: 'violet', title: 'Important' },
  note: { color: 'blue', title: 'Note' },
  tip: { color: 'teal', title: 'Tip' },
  warning: { color: 'yellow', title: 'Warning' },
} satisfies Record<GithubAlertType, { color: MantineColor; title: string }>;

export function MdxWrapper({
  children,
  ...props
}: { children?: ReactNode } & MdxProps) {
  return (
    <>
      <style>{codeBlockSpacingStyles}</style>
      <Typography data-mantine-mdx-wrapper {...props}>
        {children}
      </Typography>
    </>
  );
}

export function MdxHeading({
  order,
  ...props
}: MdxProps & { order: 1 | 2 | 3 | 4 | 5 | 6 }) {
  return <Title order={order} {...props} />;
}

export function MdxBlockquote({
  'data-alert-type': alertType,
  children,
  ...props
}: MdxProps & { children?: ReactNode }) {
  if (!isGithubAlertType(alertType)) {
    return <Blockquote {...props}>{children}</Blockquote>;
  }

  const alert = mantineMdxAlerts[alertType];
  const alertTextColor = `light-dark(color-mix(in srgb, var(--mantine-color-${alert.color}-light-color), black 25%), var(--mantine-color-${alert.color}-text))`;

  return (
    <Blockquote color={alert.color} {...props}>
      <Text mb="xs" c={alertTextColor} fw={700}>
        {alert.title}
      </Text>
      {children}
    </Blockquote>
  );
}

export const MdxTypography = {
  a: (props: MdxProps) => <Anchor {...props} />,
  b: (props: MdxProps) => <Text component="b" fw={700} {...props} />,
  blockquote: MdxBlockquote,
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
