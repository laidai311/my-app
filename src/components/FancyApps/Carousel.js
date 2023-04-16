import React, { useRef, useEffect } from "react";
import { Carousel as NativeCarousel } from "@fancyapps/ui";
import "@fancyapps/ui/dist/carousel/carousel.css";

const { Thumbs } =
    typeof window === "object"
        ? require("@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js")
        : {};
import "@fancyapps/ui/dist/carousel/carousel.thumbs.css";

function CustomCarousel(props) {
    const { options = {}, className, has, ...restProps } = props;
    const wrapper = useRef(null);

    useEffect(() => {
        let plugins = {};
        if (has?.thumbs) plugins = { ...plugins, Thumbs };

        const instance = new NativeCarousel(wrapper.current, options, plugins);

        return () => {
            instance.destroy();
        };
    }, []);

    return (
        <div
            {...restProps}
            className={`f-carousel ${className ? className : ""}`}
            ref={wrapper}
            style={{
                "--f-button-color": "rgb(71 85 105)",
                "--f-button-border-radius": "50%",
                "--f-button-shadow":
                    "0 6px 12px -2px rgb(50 50 93 / 25%), 0 3px 7px -3px rgb(0 0 0 / 30%)",

                "--f-button-bg": "#fff",
                "--f-button-hover-bg": "#f9f9f9",
                "--f-button-active-bg": "#f0f0f0",
            }}
        />
    );
}

export default CustomCarousel;
