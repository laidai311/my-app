import CustomScrollbars from "@/components/CustomScrollbars";
import { useUserStore } from "@/libs/store";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const BarLayout = ({ children }) => {
    const { user } = useUserStore();

    return (
        <div className="">
            <Navbar />
            <div className="flex-1 min-h-[calc(var(--window-inner-height)_-_64px)]">
                {/* <CustomScrollbars> */}
                <div className="flex container mx-auto">
                    <Sidebar />
                    <div className="flex-1">
                        <div className="">{children}</div>
                    </div>
                </div>
                {/* </CustomScrollbars> */}
            </div>
        </div>
    );
};

export default BarLayout;
