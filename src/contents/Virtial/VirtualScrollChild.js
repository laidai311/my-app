import React, { useRef } from 'react';
import { useInViewport } from 'ahooks';

/**
 * A wrapper component for children of
 * VirtualScroll. Computes inline style and
 * handles whether to display props.children.
 */
function VirtualScrollChild({ height, children }) {
  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);
  const style = {
    height: `${height}px`,
    overflow: 'hidden',
  };
  return (
    <div style={style} ref={ref}>
      {inViewport ? children : null}
    </div>
  );
}

export default VirtualScrollChild;
