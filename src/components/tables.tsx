import { Table } from '@mantine/core';

export function MdxTable(props: Record<string, unknown>) {
  return <Table {...props} />;
}

export const MdxTableParts = {
  caption: (props: Record<string, unknown>) => <Table.Caption {...props} />,
  tbody: (props: Record<string, unknown>) => <Table.Tbody {...props} />,
  td: (props: Record<string, unknown>) => <Table.Td {...props} />,
  tfoot: (props: Record<string, unknown>) => <Table.Tfoot {...props} />,
  th: (props: Record<string, unknown>) => <Table.Th {...props} />,
  thead: (props: Record<string, unknown>) => <Table.Thead {...props} />,
  tr: (props: Record<string, unknown>) => <Table.Tr {...props} />,
};
