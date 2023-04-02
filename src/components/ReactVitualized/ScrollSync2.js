import {
    AutoSizer,
    Grid,
    List,
    ScrollSync,
    WindowScroller,
} from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once

export default function ScrollSyncExample(props) {
    return (
        <WindowScroller>
            {({ height }) => (
                <AutoSizer disableHeight>
                    {({ width }) => {
                        <ScrollSync>
                            {({
                                clientHeight,
                                clientWidth,
                                onScroll,
                                scrollHeight,
                                scrollLeft,
                                scrollTop,
                                scrollWidth,
                            }) => (
                                <div className="flex">
                                    <div className="LeftColumn">
                                        <List
                                            rowCount={1000}
                                            rowHeight={32}
                                            autoHeight
                                            height={height}
                                            // onScroll={onChildScroll}
                                            scrollTop={scrollTop}
                                            // isScrolling={isScrolling}
                                            width={width}
                                            rowRenderer={({
                                                index,
                                                key,
                                                style,
                                            }) => (
                                                <div key={key} style={style}>
                                                    {"item " + index}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="RightColumn">
                                        <Grid
                                            onScroll={onScroll}
                                            autoHeight
                                            // isScrolling={isScrolling}
                                            // scrollLeft={scrollLeft}
                                            // scrollTop={scrollTop}
                                            columnCount={100}
                                            columnWidth={200}
                                            height={height}
                                            rowCount={1000}
                                            rowHeight={30}
                                            width={width}
                                            cellRenderer={({
                                                columnIndex,
                                                isScrolling,
                                                isVisible,
                                                key,
                                                rowIndex,
                                                style,
                                            }) => {
                                                const content = isScrolling
                                                    ? "..."
                                                    : "column " +
                                                      columnIndex +
                                                      " row " +
                                                      rowIndex;
                                                return (
                                                    <div
                                                        key={key}
                                                        style={style}
                                                    >
                                                        {content}
                                                    </div>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </ScrollSync>;
                    }}
                </AutoSizer>
            )}
        </WindowScroller>
    );
}
