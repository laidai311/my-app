import { useRef, useState } from "react";
import { AutoSizer, Grid, InfiniteLoader, WindowScroller } from "react-virtualized";

const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

export default function GridExample(props) {
  const _scrollTop = useRef();
  const _onRowsRendered = useRef();
  const loadedRowsMap = useRef({});
  const [columnWidth, setColumnWidth] = useState(200);
  const columnCount = useRef(3);
  console.log(columnWidth);
  return (
    <div className="flex">
      <div className="h-screen w-60 bg-red-500 sticky top-0 hidden md:block"></div>
      <div className="grow m-3">
        {/* <div className="bg-red-500 h-96">ABC 123</div> */}
        <div className="bg-red-500 h-96">ABC 123</div>
        <WindowScroller>
          {({
            height,
            isScrolling,
            onChildScroll,
            // registerChild,
            scrollLeft,
            scrollTop,
          }) => {
            _scrollTop.current = scrollTop;
            // _registerChild.current = registerChild;
            return (
              <div className="">
                <AutoSizer
                  disableHeight
                  onResize={({ width }) => {
                    setColumnWidth((width - 200) / columnCount.current);
                  }}
                >
                  {({ width }) => (
                    <div className="">
                      <div className="flex">
                        <InfiniteLoader
                          isRowLoaded={({ index }) => !!loadedRowsMap.current[index]}
                          loadMoreRows={({ startIndex, stopIndex }) => {
                            for (var i = startIndex; i <= stopIndex; i++) {
                              loadedRowsMap.current[i] = STATUS_LOADING;
                            }
                            const increment = stopIndex - startIndex + 1;
                            // console.log(increment);

                            const timeoutId = setTimeout(() => {
                              // delete _timeoutIdMap.current[timeoutId];

                              for (var i = startIndex; i <= stopIndex; i++) {
                                loadedRowsMap.current[i] = STATUS_LOADED;
                              }

                              // this.setState({
                              //   loadingRowCount: loadingRowCount - increment,
                              //   loadedRowCount: loadedRowCount + increment,
                              // });

                              // promiseResolver();
                            }, 1000 + Math.round(Math.random() * 2000));

                            // _timeoutIdMap.current[timeoutId] = true;

                            let promiseResolver;

                            // return new Promise((resolve) => {
                            //   promiseResolver = resolve;
                            // });
                          }}
                          rowCount={1000}
                          threshold={1}
                          minimumBatchSize={10}
                        >
                          {({ onRowsRendered, registerChild }) => {
                            _onRowsRendered.current = onRowsRendered;
                            return (
                              <div ref={registerChild}>
                                <Grid
                                  className="bg-red-200 outline-none"
                                  autoHeight
                                  isScrolling={isScrolling}
                                  // scrollLeft={scrollLeft}
                                  scrollTop={_scrollTop.current}
                                  sc
                                  columnCount={columnCount.current}
                                  columnWidth={columnWidth}
                                  height={height}
                                  rowCount={1000}
                                  rowHeight={30}
                                  width={width - 200}
                                  cellRenderer={({ columnIndex, isScrolling, isVisible, key, rowIndex, style }) => {
                                    const content = isScrolling ? "..." : "column " + columnIndex + " row " + rowIndex;
                                    const widthChange = columnWidth - style.width < 0 ? 0 : columnWidth - style.width;
                                    return columnIndex < 1 ? (
                                      <div key={key} style={{ ...style, width: style.width + widthChange }}>
                                        {content}
                                      </div>
                                    ) : (
                                      <div
                                        key={key}
                                        style={{ ...style, left: style.left + widthChange, width: style.width + widthChange }}
                                      >
                                        {content}
                                      </div>
                                    );
                                  }}
                                  onSectionRendered={({ rowStartIndex, rowStopIndex }) => {
                                    _onRowsRendered.current({
                                      startIndex: rowStartIndex,
                                      stopIndex: rowStopIndex,
                                    });
                                  }}
                                />
                              </div>
                            );
                          }}
                        </InfiniteLoader>
                        <div>
                          <Grid
                            className="bg-slate-400 outline-none"
                            autoHeight
                            isScrolling={isScrolling}
                            // scrollLeft={scrollLeft}
                            scrollTop={_scrollTop.current}
                            columnCount={1}
                            columnWidth={200}
                            height={height}
                            rowCount={1000}
                            rowHeight={30}
                            width={200}
                            cellRenderer={({ columnIndex, isScrolling, isVisible, key, rowIndex, style }) => {
                              return (
                                <div key={key} style={style}>
                                  {"column " + columnIndex + " row " + rowIndex}
                                </div>
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </AutoSizer>
              </div>
            );
          }}
        </WindowScroller>
      </div>
    </div>
  );
}
