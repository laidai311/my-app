import { styled } from '@stitches/react';

import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

const TableWrapper = styled('table', {
  borderCollapse: 'collapse',
  border: 'none',
  minWidth: '400px',
  width: '100%',
});

export function Table({ data, columns }) {
  return (
    <div className="overflow-auto w-full">
      <TableWrapper>
        <thead>
          <TableHeader columns={columns} />
        </thead>
        <tbody>
          <TableRow data={data} columns={columns} />
        </tbody>
      </TableWrapper>
    </div>
  );
}
