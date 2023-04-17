import Navbar from './Navbar';

const BarLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(var(--window-height)_-_65px)] h-auto">
        {/* <CustomScrollbars> */}
        <div className="container mx-auto my-5">
          {/* <Sidebar /> */}
          {children}
        </div>
        {/* </CustomScrollbars> */}
      </div>
    </>
  );
};

export default BarLayout;
