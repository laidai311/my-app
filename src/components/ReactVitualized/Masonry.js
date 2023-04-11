import { refEqual } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  Masonry,
  WindowScroller,
  createMasonryCellPositioner,
} from 'react-virtualized';

const _gutterSize = 10;
const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

const MasonryExample = (props) => {
  const loadedRowsMap = useRef({});
  const _viewMore = useRef();
  const _width = useRef(0);
  const _cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 200,
      fixedWidth: true,
    })
  );
  const _cellPositioner = useRef(
    createMasonryCellPositioner({
      cellMeasurerCache: _cache.current,
      columnCount: 1,
      columnWidth: _width.current,
      spacer: _gutterSize,
    })
  );
  const _masonry = useRef();
  const _infiniteLoader = useRef();
  const _windowScroller = useRef();
  const _rowCount = useRef(0);

  const _resetCellPositioner = () => {
    _cellPositioner.current.reset({
      columnCount: 1,
      columnWidth: _width.current,
      spacer: _gutterSize,
    });
  };

  const _resetList = () => {
    _cache.current.clearAll();
    _resetCellPositioner();
    _masonry.current.clearCellPositions();
    _infiniteLoader.current.resetLoadMoreRowsCache(true);
    // _windowScroller.current?.updatePosition();
  };
  const [data, setData] = useState([]);

  return (
    <div className="w-full min-h-screen">
      <div className="bg-red-500 h-52"></div>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!loadedRowsMap.current[index]}
        minimumBatchSize={30}
        ref={_infiniteLoader}
        rowCount={data.length > 0 ? data.length + _rowCount.current : 30}
        // threshold={10}
        loadMoreRows={({ startIndex, stopIndex }) => {
          console.log('load', startIndex, stopIndex, stopIndex - startIndex);
          const increment = stopIndex - startIndex + 1;
          for (let i = startIndex; i <= stopIndex; i++) {
            loadedRowsMap.current[i] = STATUS_LOADING;
          }

          fetch(
            `https://jsonplaceholder.typicode.com/posts?_start=${startIndex}&_end=${stopIndex}'`
          )
            .then((response) => response.json())
            .then((json) => {
              setData((prev) => [...prev, ...json]);

              for (let i = startIndex; i <= stopIndex; i++) {
                loadedRowsMap.current[i] = STATUS_LOADED;
              }
              _rowCount.current += increment;
              _resetList();
            });
        }}
      >
        {({ onRowsRendered, registerChild }) => {
          return (
            <WindowScroller>
              {({ height, scrollTop }) => (
                <AutoSizer
                  disableHeight
                  onResize={({ width }) => {
                    _width.current = width;

                    _resetCellPositioner();
                    _masonry.current.recomputeCellPositions();
                  }}
                >
                  {({ width }) => {
                    return (
                      <div ref={registerChild}>
                        <Masonry
                          autoHeight
                          cellCount={
                            data.length > 0
                              ? data.length + _rowCount.current
                              : 30
                          }
                          cellMeasurerCache={_cache.current}
                          cellPositioner={_cellPositioner.current}
                          height={height}
                          onCellsRendered={onRowsRendered}
                          overscanByPixels={0}
                          ref={_masonry}
                          scrollTop={scrollTop}
                          width={width}
                          cellRenderer={({ index, key, parent, style }) => {
                            return (
                              <CellMeasurer
                                cache={_cache.current}
                                index={index}
                                key={key}
                                parent={parent}
                              >
                                <div style={style} className="!w-full">
                                  {loadedRowsMap.current[index] ===
                                  STATUS_LOADED ? (
                                    <div className="w-full h-full bg-slate-200">
                                      <div className="">
                                        {data[index]?.title}
                                      </div>
                                      <button
                                        onClick={() => {
                                          _viewMore.current = {
                                            ..._viewMore.current,
                                            [key]: !_viewMore.current?.[key],
                                          };
                                          _resetList();
                                        }}
                                      >
                                        Xem thêm
                                      </button>
                                      {_viewMore.current?.[key] && (
                                        <div>{data[index]?.body}</div>
                                      )}
                                    </div>
                                  ) : (
                                    'Loading...'
                                  )}
                                </div>
                              </CellMeasurer>
                            );
                          }}
                        />
                      </div>
                    );
                  }}
                </AutoSizer>
              )}
            </WindowScroller>
          );
        }}
      </InfiniteLoader>
    </div>
  );
};
export default MasonryExample;
