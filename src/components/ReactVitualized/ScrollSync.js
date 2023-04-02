/** @flow */

import { useState } from "react";
import { AutoSizer, Grid, ScrollSync, WindowScroller } from "react-virtualized";

const LEFT_COLOR_FROM = hexToRgb("#471061");
const LEFT_COLOR_TO = hexToRgb("#BC3959");
const TOP_COLOR_FROM = hexToRgb("#000000");
const TOP_COLOR_TO = hexToRgb("#333333");

const scrollbarSize = 17;

export default function GridExample() {
    const [data, setDate] = useState({
        columnWidth: 75,
        columnCount: 50,
        height: 300,
        overscanColumnCount: 0,
        overscanRowCount: 5,
        rowHeight: 40,
        rowCount: 100,
    });
    const {
        columnWidth,
        columnCount,
        height,
        overscanColumnCount,
        overscanRowCount,
        rowHeight,
        rowCount,
    } = data;

    function _renderBodyCell({ columnIndex, key, rowIndex, style }) {
        if (columnIndex < 1) {
            return;
        }

        return _renderLeftSideCell({ columnIndex, key, rowIndex, style });
    }

    function _renderHeaderCell({ columnIndex, key, rowIndex, style }) {
        if (columnIndex < 1) {
            return;
        }

        return _renderLeftHeaderCell({
            columnIndex,
            key,
            rowIndex,
            style,
        });
    }

    function _renderLeftHeaderCell({ columnIndex, key, style }) {
        return columnIndex > 0 ? (
            <div key={key} style={{ ...style, left: style.left - columnWidth }}>
                {`C${columnIndex}`}
            </div>
        ) : (
            <div key={key} style={style}>
                {`C${columnIndex}`}
            </div>
        );
    }

    function _renderLeftSideCell({ columnIndex, key, rowIndex, style }) {
        // const rowClass =
        //     rowIndex % 2 === 0
        //         ? columnIndex % 2 === 0
        //             ? styles.evenRow
        //             : styles.oddRow
        //         : columnIndex % 2 !== 0
        //         ? styles.evenRow
        //         : styles.oddRow;
        // const classNames = clsx(rowClass, styles.cell);

        return columnIndex > 0 ? (
            <div key={key} style={{ ...style, left: style.left - columnWidth }}>
                {`R${rowIndex}, C${columnIndex}`}
            </div>
        ) : (
            <div key={key} style={style}>
                {`R${rowIndex}, C${columnIndex}`}
            </div>
        );
    }

    return (
        <div>
            <WindowScroller>
                {({
                    height,
                    isScrolling,
                    onChildScroll,
                    registerChild,
                    scrollLeft,
                    scrollTop,
                }) => (
                    <ScrollSync>
                        {({
                            clientHeight,
                            clientWidth,
                            onScroll,
                            scrollHeight,
                            scrollLeft,
                            scrollTop,
                            scrollWidth,
                        }) => {
                            const x = scrollLeft / (scrollWidth - clientWidth);
                            const y = scrollTop / (scrollHeight - clientHeight);

                            const leftBackgroundColor = mixColors(
                                LEFT_COLOR_FROM,
                                LEFT_COLOR_TO,
                                y
                            );
                            const leftColor = "#ffffff";
                            const topBackgroundColor = mixColors(
                                TOP_COLOR_FROM,
                                TOP_COLOR_TO,
                                x
                            );
                            const topColor = "#ffffff";
                            const middleBackgroundColor = mixColors(
                                leftBackgroundColor,
                                topBackgroundColor,
                                0.5
                            );
                            const middleColor = "#ffffff";

                            return (
                                <div
                                // className={styles.GridRow}
                                >
                                    <div
                                        // className={styles.LeftSideGridContainer}
                                        style={{
                                            position: "absolute",
                                            right: scrollbarSize || 0,
                                            top: 0,
                                            color: leftColor,
                                            backgroundColor: `rgb(${topBackgroundColor.r},${topBackgroundColor.g},${topBackgroundColor.b})`,
                                            zIndex: 1,
                                        }}
                                    >
                                        <Grid
                                            className="hide-scrollbar"
                                            cellRenderer={_renderLeftHeaderCell}
                                            width={columnWidth}
                                            height={rowHeight}
                                            rowHeight={rowHeight}
                                            columnWidth={columnWidth}
                                            rowCount={1}
                                            columnCount={1}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            right: scrollbarSize || 0,
                                            top: rowHeight,
                                            color: leftColor,
                                            backgroundColor: `rgb(${leftBackgroundColor.r},${leftBackgroundColor.g},${leftBackgroundColor.b})`,
                                            zIndex: 1,
                                        }}
                                    >
                                        <Grid
                                            className="hide-scrollbar"
                                            overscanColumnCount={
                                                overscanColumnCount
                                            }
                                            overscanRowCount={overscanRowCount}
                                            cellRenderer={_renderLeftSideCell}
                                            columnWidth={columnWidth}
                                            columnCount={1}
                                            height={height - scrollbarSize}
                                            rowHeight={rowHeight}
                                            rowCount={rowCount}
                                            width={columnWidth}
                                            scrollTop={scrollTop}
                                            onScroll={onScroll}
                                        />
                                    </div>
                                    <div>
                                        <AutoSizer disableHeight>
                                            {({ width }) => (
                                                <div>
                                                    <div
                                                        style={{
                                                            backgroundColor: `rgb(${topBackgroundColor.r},${topBackgroundColor.g},${topBackgroundColor.b})`,
                                                            color: topColor,
                                                            height: rowHeight,
                                                            width:
                                                                width -
                                                                scrollbarSize,
                                                        }}
                                                    >
                                                        <Grid
                                                            className="hide-scrollbar"
                                                            columnWidth={
                                                                columnWidth
                                                            }
                                                            columnCount={
                                                                columnCount
                                                            }
                                                            height={rowHeight}
                                                            overscanColumnCount={
                                                                overscanColumnCount
                                                            }
                                                            cellRenderer={
                                                                _renderHeaderCell
                                                            }
                                                            rowHeight={
                                                                rowHeight
                                                            }
                                                            rowCount={1}
                                                            scrollTop={
                                                                scrollTop
                                                            }
                                                            scrollLeft={
                                                                scrollLeft
                                                            }
                                                            onScroll={onScroll}
                                                            width={
                                                                width -
                                                                scrollbarSize
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            backgroundColor: `rgb(${middleBackgroundColor.r},${middleBackgroundColor.g},${middleBackgroundColor.b})`,
                                                            color: middleColor,
                                                            height,
                                                            width,
                                                        }}
                                                    >
                                                        <Grid
                                                            scrollTop={
                                                                scrollTop
                                                            }
                                                            onScroll={onScroll}
                                                            columnWidth={
                                                                columnWidth
                                                            }
                                                            columnCount={
                                                                columnCount
                                                            }
                                                            height={height}
                                                            overscanColumnCount={
                                                                overscanColumnCount
                                                            }
                                                            overscanRowCount={
                                                                overscanRowCount
                                                            }
                                                            cellRenderer={
                                                                _renderBodyCell
                                                            }
                                                            rowHeight={
                                                                rowHeight
                                                            }
                                                            rowCount={rowCount}
                                                            width={width}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </AutoSizer>
                                    </div>
                                </div>
                            );
                        }}
                    </ScrollSync>
                )}
            </WindowScroller>
        </div>
    );
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

/**
 * Ported from sass implementation in C
 * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
 */
function mixColors(color1, color2, amount) {
    const weight1 = amount;
    const weight2 = 1 - amount;

    const r = Math.round(weight1 * color1.r + weight2 * color2.r);
    const g = Math.round(weight1 * color1.g + weight2 * color2.g);
    const b = Math.round(weight1 * color1.b + weight2 * color2.b);

    return { r, g, b };
}
