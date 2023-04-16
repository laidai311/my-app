import Navbar from './Navbar';

const BarLayout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <div className="min-h-[calc(var(--window-height)_-_65px)] h-auto">
        {/* <CustomScrollbars> */}
        <div className="container mx-auto">
          {/* <Sidebar /> */}
          <div className="">{children}</div>
        </div>
        {/* </CustomScrollbars> */}
      </div>
    </div>
  );
};

export default BarLayout;
