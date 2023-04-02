import { WindowScroller, List, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";

const list = Array.from({ length: 100 }).map(
    (_, index) => `list item ${index + 1}`
);

const WindowScrollerExample = (props) => {
    const rowRenderer = ({ index, style }) => (
        <div key={index} style={style}>
            {list[index]}
        </div>
    );

    return (
        <div style={{}}>
            <div style={{ height: 1000, backgroundColor: "green" }}>
                Some content
            </div>
            <WindowScroller>
                {({ height, onChildScroll, scrollTop }) => (
                    <AutoSizer disableHeight={true}>
                        {({ width }) => {
                            return (
                                <List
                                    autoHeight
                                    height={height}
                                    rowCount={list.length}
                                    rowHeight={32}
                                    rowRenderer={rowRenderer}
                                    onScroll={onChildScroll}
                                    scrollTop={scrollTop}
                                    width={width}
                                />
                            );
                        }}
                    </AutoSizer>
                )}
            </WindowScroller>
            <div style={{ height: 1000, backgroundColor: "red" }}>
                Some other content
            </div>
        </div>
    );
};

export default WindowScrollerExample;
