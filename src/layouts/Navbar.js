import { Button } from '@/components';
import Drawer from '@/components/Drawer';
import { useAuth } from '@/components/Firebase';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Sidebar = (props) => {
  const { user, isLoading, signOutApp } = useAuth();

  return (
    <div className="border-b">
      <Drawer />
      <div className="container mx-auto">
        <div className="flex space-x-3 p-2">
          <div className="">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Button
                    isLink
                    href="/"
                    color="text"
                    className="!justify-start"
                  >
                    Homepage
                  </Button>
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
              {/* <input
                type="text"
                placeholder="Search"
                className="input input-bordered"
              /> */}
            </div>
          </div>
          <div className="">
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="avatar online placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                      <span className="text-xl uppercase">
                        {user?.name?.[0] || user?.email?.[0]}
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
                    <Button
                      loading={isLoading}
                      onClick={signOutApp}
                      color="text"
                      className="!justify-start"
                    >
                      Logout
                    </Button>
                  </li>
                </ul>
              </div>
            ) : (
              <Button color="primary" isLink href="/sign-in">
                Sign in
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
