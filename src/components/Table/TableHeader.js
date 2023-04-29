import { has } from 'lodash';

export function TableHeader({ columns }) {
    return (
        <tr className="flex py-2 bg-gray-200">
            {columns?.map((column, columnIndex) => (
                <th
                    key={`table-head-cell-${columnIndex}`}
                    style={{
                        width: column?.grow ? '' : column?.width,
                        minWidth: column?.width,
                        position: has(column, 'fixed') && 'sticky',
                        right: column?.fixed === 'right' && 0,
                        borderLeft: columnIndex !== 0 && 'thin solid #ddd',
                        textAlign: column?.align || 'left'
                    }}
                    className="px-3 font-semibold text-left text-xs uppercase first:rounded-tl-md last:rounded-tr-md block w-full bg-gray-200">
                    {column.title}
                </th>
            ))}
        </tr>
    );
}
