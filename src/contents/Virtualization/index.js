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
import ReactDOM, { createRoot } from 'react-dom/client';
import { createPortal, unmountComponentAtNode } from 'react-dom';
import measureElement from './measure-element-with-portals';
import { SizeMe } from 'react-sizeme';
const bufferedItems = 1; //threshold

// const measureLayerStyle = {
//   display: 'inline-block',
//   position: 'absolute',
//   visibility: 'hidden',
//   zIndex: -1,
// };

// function measureElement(reactElement, measureFn) {
//   // Creates the hidden div appended to the document body
//   const measureLayer = document.createElement('div');

//   // apply measure layer styles
//   measureLayer.style = {
//     ...measureLayer.style,
//     ...measureLayerStyle,
//   };

//   document.body.appendChild(measureLayer);

//   /*
//    * Portals allow us to render an element inside a given DOM node.
//    * In this case we're rendering the element we want to measure inside
//    * the measureLayer located in the App root.
//    */
//   const renderedElement = ReactDOM.createPortal(reactElement, measureLayer);

//   // execute measure function
//   const res = measureFn(renderedElement);

//   // cleanup
//   ReactDOM.unmountComponentAtNode(measureLayer);
//   document.body.parentNode.removeChild(measureLayer);

//   return res;
// }

const containerStyle = {
  display: 'inline-block',
  position: 'absolute',
  visibility: 'hidden',
  zIndex: -1,
};
// modal-container
const measureDomNode = (node, enhanceMeasurableNode = (e) => e) => {
  const container = document.createElement('div');
  container.style = containerStyle;

  const clonedNode = node.cloneNode(true);
  const content = enhanceMeasurableNode(clonedNode);

  container.appendChild(content);

  document.body.appendChild(container);

  const height = container.clientHeight;
  const width = container.clientWidth;

  container.parentNode.removeChild(container);
  return { height, width };
};

const enhanceMeasurableNode = (node) => {
  /* The submenu has the height set to 0 when it's collapsed.
   * To allow the submenu's measurement, we need to set its
   * height to "auto"
   */
  node.style.height = 'auto';
  return node;
};

const measureSubmenu = (node) => measureDomNode(node, enhanceMeasurableNode);

// const containerStyle = {
//   display: 'inline-block',
//   position: 'absolute',
//   visibility: 'hidden',
//   zIndex: -1,
// };

// const measureElement = (element) => {
//   // Creates the hidden div appended to the document body
//   const container = document.createElement('div');
//   container.style = containerStyle;
//   //   container.style.display = 'inline-block';
//   // container.style.position = 'absolute';
//   // container.style.visibility = 'hidden';
//   // container.style.zIndex = '-1';
//   document.body.appendChild(container);
//   // measure-layer
//   // Renders the React element into the hidden div
//   const root = ReactDOM.createRoot(container);
//   root.render(element);
//   console.log(container);
//   // Gets the element size
//   const height = container.offsetHeight;
//   const width = container.offsetWidth;

//   // Removes the element and its wrapper from the document
//   // ReactDOM.unmountComponentAtNode(container);
//   // container.parentNode.removeChild(container);
//   return { height, width };
// };

// const measureElement = (element, container) => {
//   // const container = document.createElement('div');
//   container.style.display = 'inline-block';
//   container.style.position = 'absolute';
//   container.style.visibility = 'hidden';
//   container.style.zIndex = '-1';
//   // document.body.appendChild(container);
//   /*
//    * Portals allow us to render an element inside a given DOM node.
//    * In this case we're rendering the element we want to measure inside
//    * the measureLayer located in the App root.
//    */

//   const renderedElement = createPortal(element, container);
// console.log(container);
//   // const height = renderedElement.clientHeight;
//   // const width = renderedElement.clientWidth;

//   const height = renderedElement.clientHeight;
//   const width = renderedElement.clientWidth;

//   // unmountComponentAtNode(container);
//   // container.parentNode.removeChild(container);

//   return { height, width };
// };

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
  const wrapperRef = useRef();
  const [offsetTop, setOffsetTop] = useState(0);

  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
    elRef.current.setAttribute('id', 'react-portal-container');
  }

  useLayoutEffect(() => {
    document.body.appendChild(elRef.current);
    // return () => document.body.removeChild(elRef.current);
  }, []);

  useEffect(() => {
    references.current = [];
  });
  useLayoutEffect(() => {
    if (wrapperRef.current) {
      setOffsetTop(wrapperRef.current.offsetTop);
    }
  }, [wrapperRef.current]);

  function getReference(ref) {
    references.current = references.current.filter(Boolean).concat(ref);
  }

  function getHeights() {
    heights.current = references.current.map(
      // (ref) => ref?.getBoundingClientRect().height
      (ref) => ref?.offsetHeight
    );
    console.log(heights.current);
  }

  // get the children to be renderd
  const visibleChildren = useMemo(() => {
    const startIndex = Math.max(
      Math.floor((scrollPosition - offsetTop) / rowHeight) - bufferedItems,
      0
    );
    const endIndex = Math.min(
      Math.ceil(
        (scrollPosition + window.innerHeight - offsetTop) / rowHeight - 1
      ) + bufferedItems,
      children.length - 1
    );

    children.slice(startIndex, endIndex + 1).map((child, index) => {
      return React.cloneElement(child, {
        style: {
          height: 'auto',
        },
        ref: getReference,
      });
    });

    // const getRowHeight = (row) => measureElement(row).height;

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
  }, [children, rowHeight, scrollPosition, gap, heights.current, offsetTop]);

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
      ref={wrapperRef}
    >
      <LayoutWrapper onMount={getHeights}>{visibleChildren}</LayoutWrapper>
    </ul>
  );
};

export default Window;
