import { useEffect, useState } from "react";

const { AutoSizer, List } = require("react-virtualized");

export default function AutoSizerExample(props) {
    // const [time, setTime] = useState(new Date());
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTime(new Date());
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="">
            {/* <h1>{time.toISOString()}</h1> */}

            <div className={"h-[1000px] flex"}>
                <AutoSizer
                    // disableWidth
                    //     disableHeight
                    onResize={({ height, width }) => {
                        // console.log(height, width);
                    }}
                >
                    {({ width, height }) => (
                        <List
                            height={height}
                            rowCount={1000}
                            rowHeight={30}
                            rowRenderer={({
                                index, // Index of row
                                isScrolling, // The List is currently being scrolled
                                isVisible, // This row is visible within the List (eg it is not an overscanned row)
                                key, // Unique key within array of rendered rows
                                parent, // Reference to the parent List (instance)
                                style, // Style object to be applied to row (to position it);
                            }) => {
                                const content = isScrolling
                                    ? "..."
                                    : "column" + " " + index;

                                return (
                                    <div key={key} className="" style={style}>
                                        {content}
                                    </div>
                                );
                            }}
                            width={width}
                        />
                    )}
                </AutoSizer>
            </div>
        </div>
    );
}
