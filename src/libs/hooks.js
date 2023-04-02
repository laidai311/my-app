import { useEffect, useRef, useState } from "react";
import { createCSSVariable } from "./utils";
import { debounce } from "lodash";

export const useLockBody = (isOpen) => {
    useEffect(() => {
        const body = document.body;
        if (isOpen) {
            body.style.overflow = "hidden";
            body.style.touchAction = "none";
        } else {
            body.style.overflow = "unset";
            body.style.touchAction = "unset";
        }
    }, [isOpen]);
};

export const useResizeWindow = () => {
    useEffect(() => {
        const syncHeight = () => {
            createCSSVariable(
                "--window-inner-height",
                `${window.innerHeight}px`
            );
        };
        syncHeight();

        const debounceSync = debounce(syncHeight, 300);

        window.addEventListener("resize", debounceSync);

        return () => {
            window.removeEventListener("resize", debounceSync);
            debounceSync.cancel();
        };
    }, []);
};

export const useDisclosure = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const onToggle = () => setIsOpen(!isOpen);

    return { isOpen, onOpen, onClose, onToggle };
};

export const useDidMountEffect = (handler, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        didMount.current ? handler() : (didMount.current = true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

export const useFullscreenMode = () => {
    const [isFullscreen, setFullscreen] = useState(false);
    const elementRef = useRef();

    useEffect(() => {
        const changeHandler = () => setFullscreen((mode) => !mode);

        document.addEventListener("fullscreenchange", changeHandler, false);
        document.addEventListener("mozfullscreenchange", changeHandler, false);
        document.addEventListener("MSFullScreenChange", changeHandler, false);
        document.addEventListener(
            "webkitfullscreenchange",
            changeHandler,
            false
        );

        return () => {
            document.removeEventListener("fullscreenchange", changeHandler);
            document.removeEventListener("mozfullscreenchange", changeHandler);
            document.removeEventListener("MSFullScreenChange", changeHandler);
            document.removeEventListener(
                "webkitfullscreenchange",
                changeHandler
            );
        };
    }, []);

    const goFullscreen = () => {
        if (elementRef.current.requestFullscreen) {
            elementRef.current.requestFullscreen();
        } else if (elementRef.current.mozRequestFullscreen) {
            //Firefox
            elementRef.current.mozRequestFullscreen();
        } else if (elementRef.current.webkitRequestFullscreen) {
            //Chrome, safari, opera
            elementRef.current.webkitRequestFullscreen();
        } else if (elementRef.current.msRequestFullscreen) {
            //IE, edge
            elementRef.current.msRequestFullscreen();
        }
    };

    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };

    const ToggleIcon = (
        <div className="">
            {/* <FontAwesomeIcon
                icon={!isFullscreen ? "expand" : "compress"}
                onClick={() => (!isFullscreen ? goFullscreen() : exitFullScreen())}
            /> */}
        </div>
    );
    return [elementRef, ToggleIcon]; //Icon, ref
};
