import { useState } from "react";
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader, WindowScroller } from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once

const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 550,
});

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

const InfiniteLoaderExample = (props) => {
    const { dataSource, nextFetch, isLoading, hasMore, page, total, error, ...otherProps } = props;
    const [isMounted, setIsMounted] = useState(false);

    const isRowLoaded = ({ index }) => !!itemStatusMap[index];

    const loadMoreRows = async ({ startIndex, stopIndex }) => {
        for (let index = startIndex; index <= stopIndex; index++) {
            itemStatusMap[index] = LOADING;
        }

        await new Promise((r) => setTimeout(r, 1000));

        for (let index = startIndex; index <= stopIndex; index++) {
            itemStatusMap[index] = LOADED;
        }
    };

    const rowRenderer = ({ index, key, style, parent }) => {
        let label;
        if (itemStatusMap[index] === LOADED) {
            label = `Row ${index}`;
        } else {
            label = "Loading...";
        }

        if (!isMounted) {
            setIsMounted(true);
        }

        return (
            <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
                {({ registerChild }) => (
                    <div style={style} className="row" ref={registerChild}>
                        <div className="h-96">{label}</div>
                    </div>
                )}
            </CellMeasurer>
        );
    };

    return (
        <div className="min-h-screen flex flex-col overflow-x-auto w-full">
            <div className="flex-1 h-full overflow-auto w-full min-w-fit">
                <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={100}>
                    {({ onRowsRendered, registerChild }) => (
                        <WindowScroller scrollElement={window} ref={registerChild}>
                            {({ height, isScrolling, onChildScroll, scrollTop, registerChild }) => (
                                <AutoSizer disableHeight>
                                    {({ width }) => (
                                        <div ref={registerChild}>
                                            <List
                                                ref={(el) => {
                                                    window.listEl = el;
                                                }}
                                                className="list"
                                                autoHeight
                                                height={height}
                                                onRowsRendered={onRowsRendered}
                                                // ref={registerChild} // enables a set of rows to be refreshed once their data has finished loading
                                                rowCount={100}
                                                deferredMeasurementCache={cache}
                                                rowHeight={cache.rowHeight}
                                                rowRenderer={rowRenderer}
                                                width={width}
                                                // isScrolling={isScrolling}
                                                scrollTop={scrollTop}
                                                isScrolling={isScrolling}
                                                onScroll={onChildScroll}
                                                scrollToIndex={-1}
                                            />
                                        </div>
                                    )}
                                </AutoSizer>
                            )}
                        </WindowScroller>
                    )}
                </InfiniteLoader>
            </div>
        </div>
    );
};

export default InfiniteLoaderExample;
