/** @flow */
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    ContentBox,
    ContentBoxHeader,
    ContentBoxParagraph,
} from "../demo/ContentBox";
import Immutable from "immutable";
import AutoSizer from "../AutoSizer";
import InfiniteLoader from "./InfiniteLoader";
import List from "../List";
import styles from "./InfiniteLoader.example.css";

const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

const list = Array.from({ length: 100 }).map(
    (_, index) => `list item ${index + 1}`
);

export default function InfiniteLoaderExample() {
    const [data, setData] = useState({
        loadedRowCount: 0,
        loadedRowsMap: {},
        loadingRowCount: 0,
    });

    useEffect(() => {
        return () => {
            Object.keys(_timeoutIdMap).forEach((timeoutId) => {
                clearTimeout(timeoutId);
            });
        };
    });

    function _clearData() {
        setData({
            loadedRowCount: 0,
            loadedRowsMap: {},
            loadingRowCount: 0,
        });
    }

    function _isRowLoaded({ index }) {
        const { loadedRowsMap } = data;
        return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
    }

    function _loadMoreRows({ startIndex, stopIndex }) {
        const { loadedRowsMap, loadingRowCount } = data;
        const increment = stopIndex - startIndex + 1;

        for (var i = startIndex; i <= stopIndex; i++) {
            loadedRowsMap[i] = STATUS_LOADING;
        }

        setData({
            loadingRowCount: loadingRowCount + increment,
        });

        const timeoutId = setTimeout(() => {
            const { loadedRowCount, loadingRowCount } = data;

            delete _timeoutIdMap[timeoutId];

            for (var i = startIndex; i <= stopIndex; i++) {
                loadedRowsMap[i] = STATUS_LOADED;
            }

            this.setState({
                loadingRowCount: loadingRowCount - increment,
                loadedRowCount: loadedRowCount + increment,
            });

            promiseResolver();
        }, 1000 + Math.round(Math.random() * 2000));

        _timeoutIdMap[timeoutId] = true;

        let promiseResolver;

        return new Promise((resolve) => {
            promiseResolver = resolve;
        });
    }

    function _rowRenderer({ index, key, style }) {
        const { list } = this.context;
        const { loadedRowsMap } = this.state;

        const row = list.get(index);
        let content;

        if (loadedRowsMap[index] === STATUS_LOADED) {
            content = row.name;
        } else {
            content = (
                <div
                    className={'placeholder'}
                    style={{ width: 123 }}
                />
            );
        }

        return (
            <div key={key} style={style}>
                {content}
            </div>
        );
    }

    return (
        <InfiniteLoader
            isRowLoaded={_isRowLoaded}
            loadMoreRows={_loadMoreRows}
            rowCount={list.length}
        >
            {({ onRowsRendered, registerChild }) => (
                <AutoSizer disableHeight>
                    {({ width }) => (
                        <List
                            ref={registerChild}
                            height={200}
                            onRowsRendered={onRowsRendered}
                            rowCount={list.length}
                            rowHeight={32}
                            rowRenderer={_rowRenderer}
                            width={width}
                        />
                    )}
                </AutoSizer>
            )}
        </InfiniteLoader>
    );
}
