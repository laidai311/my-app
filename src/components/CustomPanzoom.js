import React, { useRef, useEffect } from "react";
import { Panzoom as NativePanzoom } from "@fancyapps/ui";
import "@fancyapps/ui/dist/panzoom/panzoom.css";

const { Toolbar } =
    typeof window === "object"
        ? require("@fancyapps/ui/dist/panzoom/panzoom.toolbar.esm.js")
        : {};
import "@fancyapps/ui/dist/panzoom/panzoom.toolbar.css";

function CustomPanzoom(props) {
    const { options = {}, className, children, has, ...restProps } = props;
    const wrapper = useRef(null);

    useEffect(() => {
        let plugins = {};
        if (has?.toolbar) plugins = { Toolbar };

        const instance = new NativePanzoom(wrapper.current, options, plugins);

        return () => {
            instance.destroy();
        };
    }, []);

    return (
        <div
            {...restProps}
            className={`f-panzoom ${className ? className : ""}`}
            ref={wrapper}
        />
    );
}

export default CustomPanzoom;
