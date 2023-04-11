import { useEffect, useRef, useState } from 'react';
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
  const gridRef = useRef();
  //console.log(columnWidth);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  if (!data?.length) {
    return null;
  }

  return (
    <InfiniteLoader
      isRowLoaded={({ index }) => !!loadedRowsMap[index]}
      loadMoreRows={({ startIndex, stopIndex }) => {
        for (let i = startIndex; i <= stopIndex; i++) {
          loadedRowsMap.current[i] = STATUS_LOADING;
        }
        console.log('load', startIndex, stopIndex);
      }}
      rowCount={1000}
      // threshold={1}
      minimumBatchSize={30}
    >
      {({ onRowsRendered, registerChild }) => {
        _onRowsRendered.current = onRowsRendered;
        return (
          <WindowScroller>
            {({ height, isScrolling, scrollTop }) => {
              return (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <div className="flex">
                      <div ref={registerChild}>
                        <Grid
                          ref={gridRef}
                          autoHeight
                          isScrolling={isScrolling}
                          scrollTop={scrollTop}
                          columnCount={2}
                          columnWidth={200}
                          rowCount={1000}
                          rowHeight={100}
                          height={height}
                          width={width}
                          cellRenderer={({
                            columnIndex,
                            isScrolling,
                            isVisible,
                            key,
                            rowIndex,
                            style,
                          }) => {
                            const content =
                              false && isScrolling
                                ? '...'
                                : 'column ' + columnIndex + ' row ' + rowIndex;
                            const widthChange =
                              columnWidth - style.width < 0
                                ? 0
                                : columnWidth - style.width;
                            return (
                              <div
                                key={key}
                                style={{
                                  ...style,
                                  width: style.width + widthChange,
                                }}
                              >
                                {data[rowIndex].body}
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
                          rowHeight={100}
                          width={200}
                          cellRenderer={({
                            columnIndex,
                            isScrolling,
                            isVisible,
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
              );
            }}
          </WindowScroller>
        );
      }}
    </InfiniteLoader>
  );
}
