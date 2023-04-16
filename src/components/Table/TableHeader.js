import { styled } from '@stitches/react';

const TableHeaderCell = styled('th', {
  backgroundColor: '#f1f1f1',
  padding: 12,
  fontWeight: 500,
  textAlign: 'left',
  fontSize: 14,
  color: '#2c3e50',
  '&:first-child': {
    borderTopLeftRadius: 6,
  },
  '&:last-child': {
    borderTopRightRadius: 6,
  },
});

export function TableHeader({ columns }) {
  return (
    <tr>
      {columns.map((column, columnIndex) => (
        <TableHeaderCell
          key={`table-head-cell-${columnIndex}`}
          style={{ width: column.width }}
        >
          {column.title}
        </TableHeaderCell>
      ))}
    </tr>
  );
}
