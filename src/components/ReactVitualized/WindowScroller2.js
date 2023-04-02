import { WindowScroller, List, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";

const list = Array.from({ length: 100 }).map(
    (_, index) => `list item ${index + 1}`
);

const WindowScrollerExample = (props) => {
    return (
        <div className="">
            <div>ABC 123</div>
            <WindowScroller
                // onResize={({ height, width }) => {
                //     console.log(height, width);
                // }}
                // onScroll={({ scrollLeft, scrollTop }) => {
                //     console.log(scrollLeft, scrollTop);
                // }}
            >
                {({
                    height,
                    isScrolling,
                    onChildScroll,
                    scrollTop,
                    registerChild,
                }) => (
                    <div className="">
                        <div className="bg-blue-500">Header 123</div>
                        <div>Header 123</div>
                        <AutoSizer disableHeight={true}>
                            {({ width }) => (
                                <div ref={registerChild}>
                                    <List
                                        rowCount={10000}
                                        rowHeight={32}
                                        autoHeight
                                        height={height}
                                        onScroll={onChildScroll}
                                        scrollTop={scrollTop}
                                        isScrolling={isScrolling}
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
                            )}
                        </AutoSizer>
                    </div>
                )}
            </WindowScroller>
        </div>
    );
};

export default WindowScrollerExample;
