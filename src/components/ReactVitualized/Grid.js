import _ from "lodash";
import { useRef, useState } from "react";
import {
    AutoSizer,
    Grid,
    InfiniteLoader,
    WindowScroller,
} from "react-virtualized";
export default function GridExample() {
    const items = _.range(100).map((num) => ({
        name: `Collection ${num}`,
        stt: `STT ${num}`,
        status: `status ${num}`,
        main: `main ${num}`,
    })); // data is a one-dimensional array

    const columns = [
        { id: "stt" },
        { id: "name" },
        { id: "status" },
        { id: "main" },
    ];

    const columnCount = useRef(columns.length);
    const _onRowsRendered = useRef();
    const _itemStatusMap = useRef({});
    const [columnWidth, setColumnWidth] = useState(100);

    function renderItem({ columnIndex, key, rowIndex, style }) {
        console.log(style);
        // console.log(columnIndex, rowIndex);
        return (
            <div key={key} style={{ ...style, width: columnWidth }}>
                {items?.[rowIndex]?.[`${columns?.[columnIndex].id}`]}
            </div>
        );
    }

    const _onResize = ({ height, width }) => {
        setColumnWidth(width / columnCount.current);
    };

    return (
        <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <InfiniteLoader
                    isRowLoaded={({ index }) => !!_itemStatusMap.current[index]}
                    loadMoreRows={({ startIndex, stopIndex }) => {
                        console.log(startIndex, stopIndex);
                    }}
                    rowCount={items.length}
                >
                    {({ onRowsRendered, registerChild }) => {
                        _onRowsRendered.current = onRowsRendered;
                        return (
                            <AutoSizer disableHeight onResize={_onResize}>
                                {({ width }) => (
                                    <Grid
                                        ref={registerChild}
                                        autoHeight
                                        columnCount={columnCount.current} // I want to change this to be dynamic number of columns
                                        columnWidth={columnWidth} // I want to change this to be dynamic widths
                                        width={width}
                                        height={height}
                                        rowCount={items.length}
                                        rowHeight={32}
                                        cellRenderer={renderItem}
                                        isScrolling={isScrolling}
                                        scrollTop={scrollTop}
                                        onScroll={onChildScroll}
                                        onSectionRendered={({
                                            rowStartIndex,
                                            rowStopIndex,
                                        }) => {
                                            _onRowsRendered.current({
                                                startIndex: rowStartIndex,
                                                stopIndex: rowStopIndex,
                                            });
                                        }}
                                    />
                                )}
                            </AutoSizer>
                        );
                    }}
                </InfiniteLoader>
            )}
        </WindowScroller>
    );
}
