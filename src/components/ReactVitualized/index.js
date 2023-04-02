import { useEffect, useRef, useState } from "react";
import { AutoSizer, WindowScroller, List, Grid } from "react-virtualized";
import ChannelCard from "./channelCard";
import getChannels from "./fetchChannels";

const list = Array(200)
    .fill()
    .map((val, idx) => {
        return {
            id: idx,
            name: "John Doe",
            image: "http://via.placeholder.com/40",
            text: "Điểm mấu chốt trong mô hình ODM là nhà sản xuất gốc (trong trường hợp này là Coosea)",
        };
    });

const OverviewList = (props) => {
    const { items, container, searchTerm, className } = props;

    const rows = () => {
        const rows = [];

        for (let i = 0; i < this.height; i++) {
            rows[i] = [];

            for (let j = 0; j < this.width; j++) {
                rows[i].push(`r: ${i}, c: ${j}`);
            }
        }

        return rows;
    };

    const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
        return (
            <div key={key} style={style}>
                <div className={"table-cell"}>
                    {rows[rowIndex][columnIndex]}
                </div>
            </div>
        );
    };

    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchChannels = async () => {
            const channelsData = await getChannels();
            setChannels(channelsData);
        };
        fetchChannels();
    }, []);

    const searchedChannels = searchTerm
        ? channels.filter((channel) =>
              channel.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : channels;

    const Cell = ({ columnIndex, key, rowIndex, style }) => {
        const channelIndex = rowIndex * 6 + columnIndex;
        if (!searchedChannels[channelIndex]) return; // exit if the channel on that index doesn't exist
        return (
            <li className="list-none" key={key} style={style}>
                <div className="p-3 h-full w-full">
                    <ChannelCard channel={searchedChannels[channelIndex]} />
                </div>
            </li>
        );
    };

    const columnWidth = 192; // This is the cell width. Card size will be smaller due to padding
    // const rowHeight = 224; // This is the cell height. Card size will be smaller due to padding
    const rowCount = 5000;
    const listHeight = 400;
    const rowHeight = 50;
    const rowWidth = 700;
    
    function renderRow({ index, key, style }) {
        return (
            <div key={key} style={style} className="row">
                <div className="image">
                    <img src={list[index].image} alt="" />
                </div>
                <div className="content">
                    <div>{list[index].name}</div>
                    <div>{list[index].text}</div>
                </div>
            </div>
        );
    }

    return (
        // <div className={`${className} min-h-screen container mx-auto`}>
        // </div>
            <WindowScroller>
                {({ height, isScrolling, onChildScroll }) => (
                    <AutoSizer disableHeight>
                        {({ width }) => {
                            const columnCount = Math.floor(width / columnWidth);
                            return (
                                <List
                                    width={width}
                                    height={height}
                                    rowHeight={rowHeight}
                                    rowRenderer={renderRow}
                                    rowCount={list.length}
                                    isScrolling={isScrolling}
                                    onChildScroll={onChildScroll}
                                    overscanRowCount={3}
                                />
                            );
                        }}
                    </AutoSizer>
                )}
            </WindowScroller>
    );

    // return (
    //     <WindowScroller scrollElement={container}>
    //         {({ height, isScrolling, registerChild, scrollTop }) => {
    //             return (
    //                 <AutoSizer disableHeight>
    //                     {({ width }) => {
    //                         let itemsPerRow = Math.max(
    //                             1,
    //                             Math.min(Math.round(width / 200), 4)
    //                         );
    //                         return (
    //                             <div ref={registerChild}>
    //                                 <Grid
    //                                     cellRenderer={cellRenderer}
    //                                     columnCount={20}
    //                                     columnWidth={100}
    //                                     height={500}
    //                                     rowCount={10000}
    //                                     rowHeight={30}
    //                                     width={500}
    //                                 />
    //                             </div>
    //                         );
    //                     }}
    //                 </AutoSizer>
    //             );
    //         }}
    //     </WindowScroller>
    // );
};

export default OverviewList;
