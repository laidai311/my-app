import { useRef, useState } from "react";
import {
    AutoSizer,
    InfiniteLoader,
    List,
    WindowScroller,
} from "react-virtualized";

const LOADING = 1;
const LOADED = 2;
const remoteRowCount = 100;
let itemStatusMap = {};

const list = Array(200)
    .fill()
    .map((val, idx) => {
        return "John Doe";
    });

const ListExample = (props) => {
    const [scrollElement, setScrollElement] = useState(null);
    // function isRowLoaded({ index }) {
    //     return !!list[index];
    // }
    const isRowLoaded = ({ index }) => !!itemStatusMap[index];

    // function loadMoreRows({ startIndex, stopIndex }) {
    //     console.log(startIndex, stopIndex);
    //     // return null;
    //     // return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
    //     //   .then(response => {
    //     //     // Store response data in list...
    //     //   })
    // }
    const loadMoreRows = async ({ startIndex, stopIndex }) => {
        console.log(startIndex, stopIndex);
        for (let index = startIndex; index <= stopIndex; index++) {
            itemStatusMap[index] = LOADING;
        }

        await new Promise((r) => setTimeout(r, 1000));

        for (let index = startIndex; index <= stopIndex; index++) {
            itemStatusMap[index] = LOADED;
        }
    };

    // function rowRenderer({
    //     key, // Unique key within array of rows
    //     index, // Index of row within collection
    //     isScrolling, // The List is currently being scrolled
    //     isVisible, // This row is visible within the List (eg it is not an overscanned row)
    //     style, // Style object to be applied to row (to position it)
    // }) {
    //     return (
    //         <div key={key} style={style}>
    //             {list[index]}
    //         </div>
    //     );
    // }
    const rowRenderer = ({ key, index, style }) => {
        let label;
        if (itemStatusMap[index] === LOADED) {
            label = `Row ${index}`;
        } else {
            label = "Loading...";
        }
        return (
            <div key={key} style={style}>
                {label}
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-3">HEARER</div>
            <div
                ref={(e) => setScrollElement(e)}
                className="flex-1 h-full overflow-y-auto"
            >
                {/* <div className="h-full"> */}
                    {scrollElement && (
                        // <WindowScroller scrollElement={scrollElement}>
                        //     {({
                        //         height,
                        //         isScrolling,
                        //         onChildScroll,
                        //         scrollTop,
                        //     }) => (
                                // <div className="container">
                                    <AutoSizer>
                                        {({ width, height }) => (
                                            <div className='w-full'>
                                                <div>HEADER</div>
                                                <InfiniteLoader
                                                    isRowLoaded={isRowLoaded}
                                                    loadMoreRows={loadMoreRows}
                                                    rowCount={remoteRowCount}
                                                >
                                                    {({
                                                        onRowsRendered,
                                                        registerChild,
                                                    }) => (
                                                        <List
                                                            className="list"
                                                            height={height}
                                                            onRowsRendered={
                                                                onRowsRendered
                                                            }
                                                            ref={registerChild} // enables a set of rows to be refreshed once their data has finished loading
                                                            rowCount={
                                                                remoteRowCount
                                                            }
                                                            rowHeight={20}
                                                            rowRenderer={
                                                                rowRenderer
                                                            }
                                                            width={width}
                                                            // isScrolling={
                                                            //     isScrolling
                                                            // }
                                                        />
                                                    )}
                                                </InfiniteLoader>
                                            </div>
                                        )}
                                    </AutoSizer>
                                // </div>
                        //     )}
                        // </WindowScroller>
                    )}
                {/* </div> */}
            </div>
        </div>
    );

    // return (
    //     <WindowScroller>
    //         {({ height, isScrolling, onChildScroll, scrollTop }) => (
    //             <InfiniteLoader
    //                 isRowLoaded={isRowLoaded}
    //                 loadMoreRows={loadMoreRows}
    //                 // rowCount={remoteRowCount}
    //                 rowCount={10}
    //             >
    //                 {({ onRowsRendered, registerChild }) => (
    //                     <AutoSizer disableHeight>
    //                         {({ width }) => (
    //                             <List
    //                                 ref={registerChild}
    //                                 onRowsRendered={onRowsRendered}
    //                                 isScrolling={isScrolling}
    //                                 width={width}
    //                                 height={height}
    //                                 rowCount={list.length}
    //                                 rowHeight={20}
    //                                 rowRenderer={rowRenderer}
    //                             />
    //                         )}
    //                     </AutoSizer>
    //                 )}
    //             </InfiniteLoader>
    //         )}
    //     </WindowScroller>
    // );
};

export default ListExample;
