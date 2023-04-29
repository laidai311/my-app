import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function ReactPortal({ id = 'react-portal-wrapper', ...props }) {
    const el = useRef(null);

    if (!el.current) {
        el.current = document.createElement('div');
        el.current.setAttribute('id', id);
    }

    useLayoutEffect(() => {
        document.body.appendChild(el.current);
        return () => document.body.removeChild(el.current);
    }, []);

    return createPortal(<div {...props} />, el.current);
}

export default ReactPortal;
