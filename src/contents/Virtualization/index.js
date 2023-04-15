import { throttle } from 'lodash';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  Children,
  useRef,
  useLayoutEffect,
} from 'react';
// import useElementSize from './useElementSize';
import useEventListener from './useEventListener';
import ReactDOM from 'react-dom';

const bufferedItems = 10; //threshold

const measureLayerStyle = {
  display: 'inline-block',
  position: 'absolute',
  visibility: 'hidden',
  zIndex: -1,
};

function measureElement(reactElement, measureFn) {
  // Creates the hidden div appended to the document body
  const measureLayer = document.createElement('div');

  // apply measure layer styles
  measureLayer.style = {
    ...measureLayer.style,
    ...measureLayerStyle,
  };

  document.body.appendChild(measureLayer);

  /*
   * Portals allow us to render an element inside a given DOM node.
   * In this case we're rendering the element we want to measure inside
   * the measureLayer located in the App root.
   */
  const renderedElement = ReactDOM.createPortal(reactElement, measureLayer);

  // execute measure function
  const res = measureFn(renderedElement);

  // cleanup
  ReactDOM.unmountComponentAtNode(measureLayer);
  document.body.parentNode.removeChild(measureLayer);

  return res;
}

const LayoutWrapper = ({ onMount, children }) => {
  useLayoutEffect(() => {
    onMount();
  }, [onMount]);

  return <>{children}</>;
};

const Window = ({ rowHeight, children, gap = 5 }) => {
  // const [containerRef, { height: containerHeight }] = useElementSize();
  const [scrollPosition, setScrollPosition] = useState(0);
  const references = useRef([]);
  const heights = useRef();

  useEffect(() => {
    references.current = [];
  });

  function getReference(ref) {
    references.current = references.current.filter(Boolean).concat(ref);
  }

  function getHeights() {
    heights.current = references.current.map(
      // (ref) => ref?.getBoundingClientRect().height
      (ref) => ref?.offsetHeight
    );
  }

  // get the children to be renderd
  const visibleChildren = useMemo(() => {
    const startIndex = Math.max(
      Math.floor(scrollPosition / rowHeight) - bufferedItems,
      0
    );
    const endIndex = Math.min(
      Math.ceil((scrollPosition + window.innerHeight) / rowHeight - 1) +
        bufferedItems,
      children.length - 1
    );
    let heights;
    let references;

    children.slice(startIndex, endIndex + 1).forEach((child) => {
      React.cloneElement(child, {
        rel: (ref) => (console.log(ref?.offsetHeight)),
      });
      // heights = references.map((ref) => ref?.offsetHeight);
      // console.log(heights);
    });

    return children.slice(startIndex, endIndex + 1).map((child, index) => {
      return React.cloneElement(child, {
        style: {
          position: 'absolute',
          top: (startIndex + index) * rowHeight + index * gap,
          height: rowHeight,
          // height: heights.current?.[index],
          left: 0,
          right: 0,
        },
      });
    });
  }, [children, rowHeight, scrollPosition, gap, heights.current]);

  const onScroll = useCallback(
    throttle(() => setScrollPosition(window.scrollY), 50, { leading: false }),
    []
  );

  useEventListener('scroll', onScroll, document.body);

  return (
    <ul
      style={{
        height: children.length * rowHeight,
        position: 'relative',
      }}
    >
      <LayoutWrapper onMount={getHeights}>{visibleChildren}</LayoutWrapper>
    </ul>
  );
};

export default Window;
