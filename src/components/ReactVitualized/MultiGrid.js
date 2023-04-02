/** @flow */
import * as React from "react";
import { AutoSizer, MultiGrid, WindowScroller } from "react-virtualized";

// const STYLE = {
//   border: "1px solid #ddd"
// };
// const STYLE_BOTTOM_LEFT_GRID = {
//   // borderRight: "2px solid #aaa",
//   backgroundColor: "#f7f7f7"
// };
// const STYLE_TOP_LEFT_GRID = {
//   borderBottom: "2px solid #aaa",
//   // borderRight: "2px solid #aaa",
//   fontWeight: "bold"
// };
// const STYLE_TOP_RIGHT_GRID = {
//   borderBottom: "1px solid #aaa",
//   fontWeight: "bold"
// };

export default function MultiGridExample() {
    const [state] = React.useState({
        fixedColumnCount: 1,
        fixedRowCount: 1,
        scrollToColumn: 0,
        scrollToRow: 0,
    });

    const _cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
        return (
            <div className="" key={key} style={style}>
                {rowIndex === 0 ? (
                    `Header: ${columnIndex}- ${rowIndex}`
                ) : (
                    <span>{`${columnIndex} - ${rowIndex}`}</span>
                )}
            </div>
        );
    };

    // return (
    //     <div style={{}}>
    //         <div style={{ height: 500, backgroundColor: "green" }}>
    //             Some content
    //         </div>
    //         <WindowScroller>
    //             {({ height, onChildScroll, scrollTop, registerChild, scrollLeft, isScrolling }) => (
    //                 <AutoSizer disableHeight ref={registerChild}>
    //                     {({ width }) => {
    //                         return (
    //                             <MultiGrid
    //                                 {...state}
    //                                 cellRenderer={_cellRenderer}
    //                                 columnWidth={70}
    //                                 columnCount={50}
    //                                 enableFixedColumnScroll
    //                                 enableFixedRowScroll
    //                                 height={height}
    //                                 rowHeight={70}
    //                                 rowCount={100}
    //                                 // style={STYLE}
    //                                 // styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
    //                                 // styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
    //                                 // styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
    //                                 // classNameTopLeftGrid="!right-0 !left-auto"
    //                                 // classNameBottomLeftGrid="!right-0 !left-auto"
    //                                 styleTopLeftGrid={{
    //                                     right: 0,
    //                                     left: "auto",
    //                                 }}
    //                                 styleBottomLeftGrid={{
    //                                     right: 0,
    //                                     left: "auto",
    //                                     backgroundColor: "cyan",
    //                                     color: "black",
    //                                     textAlign: "center",
    //                                     width: 70,
    //                                     // direction: "rtl",
    //                                 }}
    //                                 styleTopRightGrid={{ left: 0 }}
    //                                 styleBottomRightGrid={{ left: 0 }}
    //                                 // classNameBottomRightGrid="hide-scrollbar"
    //                                 classNameBottomLeftGrid="hide-scrollbar"
    //                                 width={width}
    //                                 hideTopRightGridScrollbar
    //                                 hideBottomLeftGridScrollbar
    //                                 hideBottomRightGridScrollbar
    //                             />
    //                         );
    //                     }}
    //                 </AutoSizer>
    //             )}
    //         </WindowScroller>
    //         {/* <div style={{ height: 1000, backgroundColor: "red" }}>
    //             Some other content
    //         </div> */}
    //     </div>
    // );

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                }}
            >
                <div>abc abc</div>
                <div style={{ flex: "1 1 auto" }}>
                    <AutoSizer>
                        {({ height, width }) => (
                            <MultiGrid
                                {...state}
                                cellRenderer={_cellRenderer}
                                columnWidth={70}
                                columnCount={50}
                                enableFixedColumnScroll
                                enableFixedRowScroll
                                height={height}
                                rowHeight={70}
                                rowCount={100}
                                // style={STYLE}
                                // styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
                                // styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
                                // styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
                                // classNameTopLeftGrid="!right-0 !left-auto"
                                // classNameBottomLeftGrid="!right-0 !left-auto"
                                styleTopLeftGrid={{ right: 0, left: "auto" }}
                                styleBottomLeftGrid={{
                                    right: 0,
                                    left: "auto",
                                    backgroundColor: "cyan",
                                    color: "black",
                                    textAlign: "center",
                                    width: 70,
                                    // direction: "rtl",
                                }}
                                styleTopRightGrid={{ left: 0 }}
                                styleBottomRightGrid={{ left: 0 }}
                                // classNameBottomRightGrid="hide-scrollbar"
                                classNameBottomLeftGrid="hide-scrollbar"
                                width={width}
                                hideTopRightGridScrollbar
                                hideBottomLeftGridScrollbar
                                hideBottomRightGridScrollbar
                                onScroll={e => {
                                    console.log(e);
                                }}
                            />
                        )}
                    </AutoSizer>
                </div>
            </div>
        </>
    );
}
