import { styled } from '@stitches/react';
import { get } from 'lodash';

const TableCell = styled('td', {
  padding: 12,
  fontSize: 14,
  color: 'GrayText',
});

export function TableRowCell({ item, column }) {
  const value = get(item, column.key);
  return (
    <TableCell>{column.render ? column.render(column, item) : value}</TableCell>
  );
}
