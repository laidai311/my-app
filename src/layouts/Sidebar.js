import { faChartSimple, faCircleInfo, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = (props) => {
    return (
        <div className="">
            <ul className="menu menu-compact bg-base-100 w-56 p-2 rounded-box space-y-1">
                <li>
                    <a className="active">
                        <FontAwesomeIcon icon={faHouse} className='w-4 h-4'/>
                        Item 2
                    </a>
                </li>
                <li>
                    <a>
                        <FontAwesomeIcon icon={faCircleInfo} className='w-4 h-4'/>
                        Item 1
                    </a>
                </li>
                <li>
                    <a>
                    <FontAwesomeIcon icon={faChartSimple} className='w-4 h-4'/>
                        Item 3
                    </a>
                </li>
            </ul>
        </div>
    );
};
export default Sidebar;
