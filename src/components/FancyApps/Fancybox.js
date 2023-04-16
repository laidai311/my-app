import React, { useRef, useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const CustomFancybox = (props) => {
    const {
        delegate = "[data-fancybox]",
        options = {},
        ...restProps
    } = props;
    const container = useRef(null);

    useEffect(() => {
        NativeFancybox.bind(container.current, delegate, options);

        return () => {
            NativeFancybox.unbind(container.current);
            NativeFancybox.close();
        };
    }, []);

    return <div {...restProps} ref={container} />;
};

export default CustomFancybox;
