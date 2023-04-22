import React, { useEffect } from 'react';
import { useInViewport } from 'ahooks';
/**
 * A container component for infinite scrolling.
 */
function InfiniteScroll({ listItems, lastRowHandler }) {
  const lastRowRef = useRef(null);
  const [lastRowInView] = useInViewport(lastRowRef);
  // if last row is in view, call the last row handler
  useEffect(() => {
    lastRowInView && lastRowHandler();
  }, [lastRowInView]);

  const Elements = listItems.map((listItem, i) => {
    const props = { key: i };
    i === listItems.length - 1 && (props['ref'] = lastRowRef);
    return <div {...props}>{listItem}</div>;
  });

  return <>{Elements}</>;
}

export default InfiniteScroll;
