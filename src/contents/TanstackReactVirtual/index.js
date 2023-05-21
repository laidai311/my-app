import React from 'react';
import {
  useVirtualizer,
  elementScroll,
  useWindowVirtualizer,
} from '@tanstack/react-virtual';

export default function Virtualizer() {
  // The scrollable element for your list
  const parentRef = React.useRef();
  const parentOffsetRef = React.useRef();
  const innerParentRef = React.useRef();
  const errorMessageRef = React.useRef();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!innerParentRef.current?.clientHeight) {
      // errorMessageRef.current.style.display = 'block';
      console.log('run');
      setOpen(true);
    }
  }, [innerParentRef.current?.clientHeight]);

  React.useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
  }, []);

  // The virtualizer
  // const rowVirtualizer = useVirtualizer({
  //   count: 10000,
  //   getScrollElement: () => parentRef.current,
  //   estimateSize: () => 35,
  // });

  const rowVirtualizer = useWindowVirtualizer({
    count: 10,
    estimateSize: () => 35,
    scrollMargin: parentOffsetRef.current,
    overscan: 5,
  });

  return (
    <>
      <div style={{ height: 300 }}>abc</div>
      {/* The scrollable element for your list */}
      <div
        ref={parentRef}
        // style={{
        //   height: `400px`,
        //   overflow: 'auto', // Make it scroll!
        // }}
      >
        {/* The large inner element to hold all of the items */}
        <div>header</div>
        {open && (
          <div ref={errorMessageRef} className=" error">
            Lỗi
          </div>
        )}
        <div
          ref={innerParentRef}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${
                rowVirtualizer.getVirtualItems()[0].start -
                rowVirtualizer.options.scrollMargin
              }px)`,
              overflowX: 'auto',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={rowVirtualizer.measureElement}
                className={
                  virtualItem.index % 2 ? 'ListItemOdd' : 'ListItemEven'
                }
              >
                <Sentences key={virtualItem.index} index={virtualItem.index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Sentences({ index }) {
  const [isOpen, setIsOpen] = React.useState();

  if (isOpen) {
    return null;
  }
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="bg-[#f50] p-2"
      style={{ width: 2000 }}
    >
      {isOpen
        ? 'Esse distinctio quo voluptatem nostrum nulla officia saepe soluta omnis fugit magnam temporibus molestias consequuntur culpa eos exercitationem sapiente totam molestias enim eos veritatis qui nesciunt incidunt saepe a accusamus qui recusandae fugit molestias harum voluptatibus sapiente id debitis sed magni deleniti laudantium mollitia ullam fugit blanditiis recusandae impedit quam optio voluptatum.'
        : 'pedit quam optio voluptatum.' + index}
    </div>
  );
}
