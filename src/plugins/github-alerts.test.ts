import { describe, expect, it } from 'vitest';
import {
  GITHUB_ALERT_TYPES,
  type GithubAlertNode,
  isGithubAlertType,
  remarkGithubAlerts,
} from './github-alerts';

function text(value: string): GithubAlertNode {
  return { type: 'text', value };
}

function paragraph(...children: GithubAlertNode[]): GithubAlertNode {
  return { children, type: 'paragraph' };
}

function blockquote(...children: GithubAlertNode[]): GithubAlertNode {
  return { children, type: 'blockquote' };
}

function transform(...children: GithubAlertNode[]): GithubAlertNode {
  const tree: GithubAlertNode = { children, type: 'root' };
  remarkGithubAlerts()(tree);
  return tree.children?.[0] as GithubAlertNode;
}

function firstText(node: GithubAlertNode | undefined): string | undefined {
  const first = node?.children?.[0];
  return first?.type === 'text' ? first.value : undefined;
}

describe('remarkGithubAlerts', () => {
  it('annotates each alert type', () => {
    for (const type of GITHUB_ALERT_TYPES) {
      const node = transform(
        blockquote(paragraph(text(`[!${type.toUpperCase()}]\nBody`))),
      );

      expect(node.data?.hProperties?.['data-alert-type']).toBe(type);
      expect(firstText(node.children?.[0])).toBe('Body');
    }
  });

  it('handles line breaks and multiple paragraphs', () => {
    const lineBreak = transform(
      blockquote(
        paragraph(text('[!WARNING]'), { type: 'break' }, text('Body')),
      ),
    );
    const multiple = transform(
      blockquote(paragraph(text('[!TIP]')), paragraph(text('Body'))),
    );

    expect(firstText(lineBreak.children?.[0])).toBe('Body');
    expect(multiple.children).toHaveLength(1);
    expect(firstText(multiple.children?.[0])).toBe('Body');
  });

  it('ignores regular blockquotes', () => {
    const node = transform(blockquote(paragraph(text('Regular quote'))));

    expect(node.data).toBeUndefined();
    expect(firstText(node.children?.[0])).toBe('Regular quote');
  });

  it('validates alert types', () => {
    expect(GITHUB_ALERT_TYPES).toContain('note');
    expect(isGithubAlertType('note')).toBe(true);
    expect(isGithubAlertType('NOTE')).toBe(false);
    expect(isGithubAlertType('unknown')).toBe(false);
  });
});
