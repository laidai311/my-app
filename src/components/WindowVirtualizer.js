import React from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { Loader } from '@mantine/core';

const itemsLoading = 3;

export default function WindowVirtualizer({
    children,
    allRow,
    error,
    estimateSize,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
}) {
    const parentOffsetRef = React.useRef();
    const parentRef = React.useRef(); // Element

    React.useLayoutEffect(() => {
        parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
    }, [parentRef.current?.offsetTop]);

    const rowVirtualizer = useWindowVirtualizer({
        count: hasNextPage ? allRow.length + itemsLoading : allRow.length,
        estimateSize: () => estimateSize || 100,
        scrollMargin: parentOffsetRef.current,
        overscan: 5,
    });

    React.useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

        if (!lastItem) return;

        if (
            lastItem.index >= allRow.length - itemsLoading &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }
    }, [
        allRow.length,
        hasNextPage,
        isFetchingNextPage,
        rowVirtualizer.getVirtualItems(),
    ]);

    const items = rowVirtualizer.getVirtualItems();

    return (
        <>
            {status === 'loading' ? (
                <Loader key="Loading" />
            ) : status === 'error' ? (
                <div>{error?.message || 'Không có dữ liệu'}</div>
            ) : (
                <div ref={parentRef} className="List">
                    {allRow?.length === 0 ? (
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
                                    const isLoaderRow =
                                        virtualRow.index > allRow.length - 1;
                                    const data = allRow[virtualRow.index];

                                    if (typeof children !== 'function')
                                        throw new Error('Children is Function');

                                    return (
                                        <div
                                            key={virtualRow.key}
                                            data-index={virtualRow.index}
                                            ref={rowVirtualizer.measureElement}
                                        >
                                            {isLoaderRow ? (
                                                hasNextPage ? (
                                                    <div className="p-1">
                                                        <Skeleton.Input
                                                            block
                                                            active
                                                        />
                                                    </div>
                                                ) : null
                                            ) : (
                                                children({ data })
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div>
                {isFetching && !isFetchingNextPage ? (
                    <Loader key="Background Updating..." />
                ) : null}
            </div>
        </>
    );
}
