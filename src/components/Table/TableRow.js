import { styled } from '@stitches/react';
import { TableRowCell } from './TableRowCell';

const TableRowItem = styled('tr', {
  cursor: 'auto',
  '&:nth-child(odd)': {
    backgroundColor: '#f9f9f9',
  },
  '&:last-child': {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export function TableRow({ data, columns }) {
  return (
    <>
      {data.map((item, itemIndex) => (
        <TableRowItem key={`table-body-${itemIndex}`}>
          {columns.map((column, columnIndex) => (
            <TableRowCell
              key={`table-row-cell-${columnIndex}`}
              item={item}
              column={column}
            />
          ))}
        </TableRowItem>
      ))}
    </>
  );
}
