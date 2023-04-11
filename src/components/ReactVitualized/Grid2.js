import { useRef, useState } from 'react';
import {
  AutoSizer,
  Grid,
  InfiniteLoader,
  WindowScroller,
} from 'react-virtualized';

const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

export default function GridExample(props) {
  const _scrollTop = useRef();
  const _onRowsRendered = useRef();
  const loadedRowsMap = useRef({});
  const [columnWidth, setColumnWidth] = useState(200);
  const columnCount = useRef(3);
  return (
    <div className="flex">
      <div className="h-screen w-60 bg-red-500 sticky top-0 hidden md:block"></div>
      <div className="grow">
        {/* <div className="bg-red-500 h-96">ABC 123</div> */}
        <div className="bg-red-500 h-96"></div>
        <WindowScroller>
          {({ height, registerChild, scrollTop }) => {
            _scrollTop.current = scrollTop;
            return (
              <div ref={registerChild}>
                <AutoSizer
                  disableHeight
                  onResize={({ width }) => {
                    setColumnWidth((width - 200) / columnCount.current);
                  }}
                >
                  {({ width }) => (
                    <div className="flex">
                      <InfiniteLoader
                        isRowLoaded={({ index }) =>
                          !!loadedRowsMap.current[index]
                        }
                        loadMoreRows={({ startIndex, stopIndex }) => {
                          for (var i = startIndex; i <= stopIndex; i++) {
                            loadedRowsMap.current[i] = STATUS_LOADING;
                          }
                          console.log('load', startIndex, stopIndex);
                          const increment = stopIndex - startIndex + 1;
                          // console.log(increment);
                        }}
                        rowCount={1000}
                        //threshold={1}
                        minimumBatchSize={20}
                      >
                        {({ onRowsRendered, registerChild }) => {
                          _onRowsRendered.current = onRowsRendered;
                          return (
                            <div ref={registerChild}>
                              <Grid
                                className="bg-red-200 outline-none"
                                autoHeight
                                scrollTop={_scrollTop.current}
                                columnCount={columnCount.current}
                                columnWidth={columnWidth}
                                height={height}
                                rowCount={1000}
                                rowHeight={30}
                                width={width - 200}
                                cellRenderer={({
                                  columnIndex,
                                  key,
                                  rowIndex,
                                  style,
                                }) => {
                                  return (
                                    <div
                                      key={key}
                                      style={{
                                        ...style,
                                        width: style.width,
                                      }}
                                    >
                                      {'column ' +
                                        columnIndex +
                                        ' row ' +
                                        rowIndex}
                                    </div>
                                  );
                                }}
                                onSectionRendered={({
                                  rowStartIndex,
                                  rowStopIndex,
                                }) => {
                                  console.log(rowStartIndex, rowStopIndex);
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
                          scrollTop={_scrollTop.current}
                          columnCount={1}
                          columnWidth={200}
                          height={height}
                          rowCount={1000}
                          rowHeight={30}
                          width={200}
                          cellRenderer={({
                            columnIndex,
                            key,
                            rowIndex,
                            style,
                          }) => {
                            return (
                              <div key={key} style={style}>
                                {'column ' + columnIndex + ' row ' + rowIndex}
                              </div>
                            );
                          }}
                        />
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
