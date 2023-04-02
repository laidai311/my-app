import AutoSizerExample from "@/components/ReactVitualized/AutoSizer";
import GridExample from "@/components/ReactVitualized/Grid2";
import ListApp from "@/components/ReactVitualized/List2";
import MultiGridExample from "@/components/ReactVitualized/MultiGrid";
import ScrollSyncExample from "@/components/ReactVitualized/ScrollSync";
import WindowScrollerExample from "@/components/ReactVitualized/WindowScroller2";

export default function VirtualizedPage() {
    return (
        <div className="">
            {/* <ListApp /> */}
            {/* <GridExample /> */}
            {/* <AutoSizerExample /> */}
            {/* <WindowScrollerExample /> */}
            <GridExample />
            {/* <ScrollSyncExample /> */}
            {/* <MultiGridExample /> */}
        </div>
    );
}
