import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function ReactPortal({ id = 'react-portal-wrapper', ...restProps }) {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
    elRef.current.setAttribute('id', id);
  }

  useLayoutEffect(() => {
    document.body.appendChild(elRef.current);
    return () => document.body.removeChild(elRef.current);
  }, []);

  return createPortal(
    <div style={{ zIndex: 1000 }} {...restProps} />,
    elRef.current
  );
}

export default ReactPortal;
