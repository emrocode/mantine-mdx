import { visit } from 'unist-util-visit';

export const GITHUB_ALERT_TYPES = [
  'note',
  'tip',
  'important',
  'warning',
  'caution',
] as const;

export type GithubAlertType = (typeof GITHUB_ALERT_TYPES)[number];

type GithubAlertData = {
  hProperties?: Record<string, unknown>;
  [key: string]: unknown;
};

export type GithubAlertNode = {
  type: string;
  value?: string;
  children?: GithubAlertNode[];
  data?: GithubAlertData;
  [key: string]: unknown;
};

const ALERT_REGEX = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*\r?\n?/i;

export function isGithubAlertType(value: unknown): value is GithubAlertType {
  return (
    typeof value === 'string' &&
    (GITHUB_ALERT_TYPES as readonly string[]).includes(value)
  );
}

/**
 * Remark plugin that turns GitHub alert blockquotes into regular blockquotes
 * annotated with a `data-alert-type` attribute.
 */
export function remarkGithubAlerts() {
  return (tree: GithubAlertNode) => {
    visit(tree, 'blockquote', (node) => {
      const blockquote = node as GithubAlertNode;
      const paragraph = blockquote.children?.[0];
      if (paragraph?.type !== 'paragraph') return;

      const paragraphChildren = paragraph.children;
      if (!paragraphChildren) return;

      const first = paragraphChildren[0];
      if (first?.type !== 'text' || typeof first.value !== 'string') return;

      const match = ALERT_REGEX.exec(first.value);
      if (!match) return;

      const type = match[1].toLowerCase();
      if (!isGithubAlertType(type)) return;

      const value = first.value.slice(match[0].length);
      if (value) {
        first.value = value;
      } else {
        paragraphChildren.shift();
        if (paragraphChildren[0]?.type === 'break') {
          paragraphChildren.shift();
        }
        if (!paragraphChildren.length) {
          blockquote.children?.shift();
        }
      }

      blockquote.data = {
        ...blockquote.data,
        hProperties: {
          ...blockquote.data?.hProperties,
          'data-alert-type': type,
        },
      };
    });
  };
}
