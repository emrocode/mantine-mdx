import { List } from '@mantine/core';
import type * as React from 'react';

const orderedListTypes: Record<string, React.CSSProperties['listStyleType']> = {
  '1': 'decimal',
  A: 'upper-alpha',
  a: 'lower-alpha',
  I: 'upper-roman',
  i: 'lower-roman',
};

export function MdxUl(props: Record<string, unknown>) {
  return <List {...props} />;
}

export function MdxOl(props: Record<string, unknown>) {
  const { type, ...rest } = props;
  const listStyleType =
    typeof type === 'string' ? (orderedListTypes[type] ?? type) : undefined;

  return <List type="ordered" listStyleType={listStyleType} {...rest} />;
}

type ListItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof List.Item>,
  'children'
> & {
  children?: React.ReactNode;
};

export function MdxLi(props: ListItemProps) {
  const { children, className, ...rest } = props;
  const isTaskItem =
    typeof className === 'string' &&
    className.split(/\s+/).includes('task-list-item');

  if (!isTaskItem) {
    return (
      <List.Item className={className} {...rest}>
        {children}
      </List.Item>
    );
  }

  return (
    <List.Item className={className} {...rest}>
      <span
        style={{
          alignItems: 'center',
          display: 'inline-flex',
          gap: 'var(--mantine-spacing-xs)',
          verticalAlign: 'middle',
        }}
      >
        {children}
      </span>
    </List.Item>
  );
}
