import { Empty, Skeleton } from 'antd';
import { size } from 'lodash';
import { TableRowCell } from './TableRowCell';

export function TableRow({ data, columns, error, fetching, rowHeight }) {
    if (error && !fetching) {
        return (
            <tr className="h-52">
                <td
                    style={{ zIndex: 0 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    {error?.message && (
                        <Empty
                            description={error?.message || 'Không tìm thấy dữ liệu trên hệ thống!'}
                        />
                    )}
                </td>
            </tr>
        );
    }

    return (
        <>
            {size(data)
                ? data.map((item, itemIndex) => (
                      <tr
                          style={{ height: rowHeight }}
                          key={`table-body-${itemIndex}`}
                          className="cursor-auto even:bg-white odd:bg-gray-50 hover:bg-gray-100 last:rounded-b-md flex text-sm">
                          {columns.map((column, columnIndex) => (
                              <TableRowCell
                                  key={`table-row-cell-${columnIndex}`}
                                  item={item}
                                  column={column}
                                  columnIndex={columnIndex}
                              />
                          ))}
                      </tr>
                  ))
                : null}
            {fetching ? (
                <tr className="min-h-16">
                    <td className="space-y-5">
                        <Skeleton active />
                        <Skeleton active />
                    </td>
                </tr>
            ) : null}
        </>
    );
}
