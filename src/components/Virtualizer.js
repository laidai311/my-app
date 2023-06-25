import React from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

export default function Virtualizer({ children, data = [], estimateSize }) {
    const parentOffsetRef = React.useRef();
    const parentRef = React.useRef(); // Element

    React.useLayoutEffect(() => {
        parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
    }, [parentRef.current?.offsetTop]);

    const rowVirtualizer = useWindowVirtualizer({
        count: data.length,
        estimateSize: () => estimateSize || 100,
        scrollMargin: parentOffsetRef.current,
    });

    const items = rowVirtualizer.getVirtualItems();

    return (
        <div ref={parentRef} className="List">
            {data?.length === 0 ? (
                <div>Không có dữ liệu</div>
            ) : (
                <div
                    style={{
                        height: rowVirtualizer.getTotalSize(),
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: `translateY(${
                                items[0]?.start -
                                rowVirtualizer.options.scrollMargin
                            }px)`,
                        }}
                    >
                        {items.map((virtualRow) => {
                            const _data = data[virtualRow.index];

                            if (typeof children !== 'function')
                                throw new Error('Children not Function');

                            return (
                                <div
                                    key={virtualRow.key}
                                    data-index={virtualRow.index}
                                    ref={rowVirtualizer.measureElement}
                                >
                                    {children({ data: _data })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
