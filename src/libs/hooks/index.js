import React, { useRef } from 'react';
import { useRouter } from 'next/router';

export * from './use-scroll-restoration';
export * from './use-store';

export const useWindowHeight = () => {
    const isDetectKeyboardOpen = useDetectKeyboardOpen();
    React.useEffect(() => {
        const isMobile =
            typeof window === 'object'
                ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                      window.navigator.userAgent
                  )
                : false;
        const syncHeight = () => {
            if (isDetectKeyboardOpen && isMobile) return;

            document.documentElement.style.setProperty(
                '--window-height',
                `${window.innerHeight}px`
            );
        };
        syncHeight();

        window.addEventListener('resize', syncHeight);
        return () => window.removeEventListener('resize', syncHeight);
    }, []);
};

export const useDidMountEffect = (effect, deps) => {
    const didMount = React.useRef(false);

    React.useEffect(() => {
        didMount.current ? effect() : (didMount.current = true);
    }, [...deps]);
};

export const useAbortedEffect = (effect, deps) => {
    React.useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const cleanupEffect = effect(signal);

        return () => {
            if (cleanupEffect) {
                cleanupEffect();
            }
            abortController.abort();
        };
    }, [...deps]);
};

// Hook
export function useOnClickOutside(ref, handler) {
    React.useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

export const useDetectKeyboardOpen = (
    minKeyboardHeight = 300,
    defaultValue = false
) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(defaultValue);

    React.useEffect(() => {
        const listener = () => {
            const newState =
                window.screen.height - minKeyboardHeight >
                window.visualViewport.height;
            if (isKeyboardOpen != newState) {
                setIsKeyboardOpen(newState);
            }
        };
        if (typeof visualViewport != 'undefined') {
            window.visualViewport.addEventListener('resize', listener);
        }
        const handleOff = () => {
            setIsKeyboardOpen(false);
        };
        document.addEventListener('focusout', handleOff);
        return () => {
            if (typeof visualViewport != 'undefined') {
                window.visualViewport.removeEventListener('resize', listener);
            }
            document.removeEventListener('focusout', handleOff);
        };
    }, []);

    return isKeyboardOpen;
};

export const useLockBodyScroll = (isLocked) => {
    const prevPosition = React.useRef();
    const prevOverflow = React.useRef();
    const isTouchScreen = React.useRef(
        'ontouchstart' in document.documentElement ? true : false
    );

    React.useLayoutEffect(() => {
        const setOverflowHidden = () => {
            if (prevOverflow.current === undefined) {
                prevOverflow.current = {
                    overflow: document.body.style.overflow,
                    paddingRight: document.body.style.paddingRight,
                    scrollBarGap:
                        window.innerWidth -
                        document.documentElement.clientWidth,
                    getPaddingRight: parseInt(
                        window.getComputedStyle(document.body).paddingRight,
                        10
                    ),
                };

                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight =
                    prevOverflow.current?.scrollBarGap +
                    prevOverflow.current?.getPaddingRight +
                    'px';
            }
        };

        const restoreOverflowHiddenSetting = () => {
            if (prevOverflow.current !== undefined) {
                document.body.style.overflow = prevOverflow.current?.overflow;
                document.body.style.paddingRight =
                    prevOverflow.current?.paddingRight;

                prevOverflow.current = undefined;
            }
        };

        const setPositionFixed = () => {
            return window.requestAnimationFrame(() => {
                if (prevPosition.current === undefined) {
                    prevPosition.current = {
                        position: document.body.style.position,
                        top: document.body.style.top,
                        left: document.body.style.left,
                    };

                    // Update the dom inside an animation frame
                    const scrollY = window.scrollY,
                        scrollX = window.scrollX,
                        innerHeight = window.innerHeight;

                    document.body.style.position = 'fixed';
                    document.body.style.top = `-${scrollY}px`;
                    document.body.style.left = `-${scrollX}px`;

                    setTimeout(
                        () =>
                            window.requestAnimationFrame(() => {
                                // Attempt to check if the bottom bar appeared due to the position change
                                const bottomBarHeight =
                                    innerHeight - window.innerHeight;
                                if (bottomBarHeight && scrollY >= innerHeight) {
                                    // Move the content further up so that the bottom bar doesn't hide it
                                    document.body.style.top = -(
                                        scrollY + bottomBarHeight
                                    );
                                }
                            }),
                        300
                    );
                }
            });
        };

        const restorePositionSetting = () => {
            if (prevPosition.current !== undefined) {
                // Convert the position from "px" to Int
                var y = -parseInt(document.body.style.top, 10);
                var x = -parseInt(document.body.style.left, 10);

                // Restore styles
                document.body.style.position = prevPosition.current.position;
                document.body.style.top = prevPosition.current.top;
                document.body.style.left = prevPosition.current.left;

                // Restore scroll
                window.scrollTo(x, y);

                prevPosition.current = undefined;
            }
        };

        const disableBodyScroll = () => {
            if (isTouchScreen.current) {
                setPositionFixed();
            } else {
                setOverflowHidden();
            }
        };

        const enableBodyScroll = () => {
            if (isTouchScreen.current) {
                restorePositionSetting();
            } else {
                restoreOverflowHiddenSetting();
            }
        };
        isLocked ? disableBodyScroll() : enableBodyScroll();

        return () => enableBodyScroll();
    }, [isLocked]);
};

export const useUpdateEffect = (callback, dependencies = []) => {
    const firstRenderRef = React.useRef(true);

    React.useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback();
    }, [...dependencies]);
};

export function useWindowSize() {
    const [windowSize, setWindowSize] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    React.useEffect(() => {
        const listener = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, []);

    return windowSize;
}

export function useArray(defaultValue) {
    const [array, setArray] = React.useState(defaultValue);

    function push(element) {
        setArray((a) => [...a, element]);
    }

    function filter(callback) {
        setArray((a) => a.filter(callback));
    }

    function update(index, newElement) {
        setArray((a) => [
            ...a.slice(0, index),
            newElement,
            ...a.slice(index + 1, a.length),
        ]);
    }

    function remove(index) {
        setArray((a) => [
            ...a.slice(0, index),
            ...a.slice(index + 1, a.length),
        ]);
    }

    function clear() {
        setArray([]);
    }

    return { array, set: setArray, push, filter, update, remove, clear };
}

export const useToggleWithHistory = (args) => {
    const [open, setOpen] = React.useState(args?.defaultValue ?? undefined);
    const router = useRouter();

    React.useEffect(() => {
        router.beforePopState((state) => {
            state.options.scroll = false;
            return true;
        });
    }, []);

    const push = React.useCallback(
        (data, options) => {
            const url =
                typeof options?.url === 'string'
                    ? options?.url
                    : args?.initialUrl ?? undefined;
            window.history.scrollRestoration = 'manual';
            window.history.pushState(null, '', url);
            setOpen(data);
        },
        [args, setOpen]
    );

    const back = React.useCallback(() => {
        window.history.scrollRestoration = 'manual';
        window.history.back();
        setOpen();
    }, [setOpen]);

    React.useEffect(() => {
        window.addEventListener('popstate', () => setOpen());
        return () => window.removeEventListener('popstate', () => setOpen());
    }, []);

    return [open, { push, back, set: setOpen }];
};

export const useLockBodyScroll2 = (isLocked) => {
    const prevOverflow = React.useRef();
    const scrollY = React.useRef();
    const scrollX = React.useRef();

    const setOverflowHidden = () => {
        if (prevOverflow.current === undefined) {
            prevOverflow.current = {
                overflow: document.body.style.overflow,
                paddingRight: document.body.style.paddingRight,
                scrollBarGap:
                    window.innerWidth - document.documentElement.clientWidth,
                getPaddingRight: parseInt(
                    window.getComputedStyle(document.body).paddingRight,
                    10
                ),
            };
            scrollY.current = window.scrollY;
            scrollX.current = window.scrollX;

            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight =
                prevOverflow.current?.scrollBarGap +
                prevOverflow.current?.getPaddingRight +
                'px';
        }
    };

    const restoreOverflowHiddenSetting = () => {
        if (prevOverflow.current !== undefined) {
            document.body.style.overflow = prevOverflow.current?.overflow;
            document.body.style.paddingRight =
                prevOverflow.current?.paddingRight;

            window.scrollTo(scrollX.current, scrollY.current);

            scrollX.current = undefined;
            scrollY.current = undefined;
            prevOverflow.current = undefined;
        }
    };

    const disableBodyScroll = () => {
        setOverflowHidden();
    };

    const enableBodyScroll = () => {
        restoreOverflowHiddenSetting();
    };

    React.useLayoutEffect(() => {
        isLocked ? disableBodyScroll() : enableBodyScroll();

        return () => enableBodyScroll();
    }, [isLocked]);
};

export function useDebouncedState2(
    defaultValue,
    wait,
    options = { leading: false }
) {
    const [value, setValue] = React.useState(defaultValue);
    const timeoutRef = React.useRef(null);
    const leadingRef = React.useRef(true);

    const clearTimeout = () => window.clearTimeout(timeoutRef.current);

    React.useEffect(() => clearTimeout, []);

    const debouncedSetValue = (newValue) => {
        clearTimeout();
        if (leadingRef.current && options.leading) {
            setValue(newValue);
        } else {
            timeoutRef.current = window.setTimeout(() => {
                leadingRef.current = true;
                setValue(newValue);
            }, wait);
        }
        leadingRef.current = false;
    };

    return [value, debouncedSetValue];
}
