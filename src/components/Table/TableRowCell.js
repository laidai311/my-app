import { get, has } from 'lodash';

export function TableRowCell({ item, column, columnIndex }) {
    const value = get(item, column.key);

    return (
        <td
            className={`px-3 w-full flex items-center hover:!bg-gray-100`}
            style={{
                width: column?.grow ? '' : column?.width,
                minWidth: column?.width,
                position: has(column, 'fixed') && 'sticky',
                backgroundColor: has(column, 'fixed') && '#fff',
                right: column?.fixed === 'right' && 0,
                borderLeft: columnIndex !== 0 && 'thin solid #eee'
            }}>
            <div
                className={`w-full ${column?.ellipsis ? 'truncate' : ''}`}
                style={{
                    display: column?.align === 'center' && 'flex',
                    justifyContent: column?.align === 'center' && 'center'
                }}>
                {column.render ? column.render(column, item) : value}
            </div>
        </td>
    );
}
