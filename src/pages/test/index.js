import InfiniteLoaderExample from "@/components/ReactVitualized/InfiniteLoader";
import MultiGridExample from "@/components/ReactVitualized/MultiGrid";
import WindowScrollerExample from "@/components/ReactVitualized/WindowScroller";

const { default: ListExample } = require("@/components/ReactVitualized/List");

const TestPage = () => {
    return (
        <div className="min-h-screen">
            {/* <ListExample /> */}
            {/* <InfiniteLoaderExample /> */}
            {/* <WindowScrollerExample /> */}
            <MultiGridExample />
        </div>
    );
};

export default TestPage;
