import { useEffect, useRef, useState } from "react";
import { createCSSVariable } from "./utils";
import { debounce } from "lodash";

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
