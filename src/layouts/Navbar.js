import { useAuth } from "@/contexts/AuthUserContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Sidebar = (props) => {
    const { authUser, isLoading, signOutApp } = useAuth();

    return (
        <div className="border-b">
            <div className="container mx-auto">
                <div className="flex space-x-3 p-2">
                    <div className="">
                        <div className="dropdown">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle"
                            >
                                <FontAwesomeIcon
                                    icon={faBars}
                                    className="w-5 h-5"
                                />
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <a>Homepage</a>
                                </li>
                                <li>
                                    <a>Portfolio</a>
                                </li>
                                <li>
                                    <a>About</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grow">
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Search"
                                className="input input-bordered"
                            />
                        </div>
                    </div>
                    <div className="">
                        {authUser ? (
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="avatar online placeholder">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                            <span className="text-xl uppercase">
                                                {authUser?.name?.[0] ||
                                                    authUser?.email?.[0]}
                                            </span>
                                        </div>
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>Settings</a>
                                    </li>
                                    <li>
                                        <button
                                            className={`btn btn-ghost btn-md justify-start normal-case ${
                                                isLoading ? "loading" : ""
                                            }`}
                                            onClick={signOutApp}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link
                                href="sign-in"
                                className="btn btn-accent btn-md"
                            >
                                Sign in
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;