import { useLayoutEffect, memo, useRef } from "react";
import { createPortal } from "react-dom";

function ReactPortal({ children, wrapperId = "react-portal-wrapper" }) {
    const elRef = useRef(null);

    if (!elRef.current) {
        elRef.current = document.createElement("div");
        elRef.current.setAttribute("id", wrapperId);
    }

    useLayoutEffect(() => {
        document.body.appendChild(elRef.current);
        return () => document.body.removeChild(elRef.current);
    }, []);

    return createPortal(
        <div
            className="w-screen h-screen fixed inset-0"
            style={{ zIndex: 1000 }}
        >
            {children}
        </div>,
        elRef.current
    );
}

export default memo(ReactPortal);
