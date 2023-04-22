import { createCSSVariable } from './utils';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useClickAway, useDebounceFn, useEventListener } from 'ahooks';
import { useLayoutEffect } from 'react';
import { has } from 'lodash';

export const useBodyScroll = (isLock, element) => {
  useEffect(() => {
    const root = element ? element : document.body;
    isLock ? disableBodyScroll(root) : enableBodyScroll(root);
  }, [isLock]);
};

export const useWindowHeight = () => {
  const syncHeight = useCallback(() => {
    createCSSVariable('--window-height', `${window.innerHeight}px`);
  }, []);
  syncHeight();
  const { run } = useDebounceFn(syncHeight, { wait: 300 });
  useEventListener('resize', run);
};

export const useDidMountEffect = (effect, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    didMount.current ? effect() : (didMount.current = true);
  }, [...deps]);
};

export const useAbortedEffect = (effect, deps) => {
  useEffect(() => {
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
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
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
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export const useDetectKeyboardOpen = (
  minKeyboardHeight = 300,
  defaultValue = false
) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(defaultValue);

  useEffect(() => {
    const listener = () => {
      const newState =
        window.screen.height - minKeyboardHeight > window.visualViewport.height;
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

const hideKeyboard = () => {
  document.activeElement.blur();
};

const listener = (e) => {
  // const root = ref.current ? ref.current : document.body;
  // if (!root || root.contains(e.target)) return;
  hideKeyboard();
};

export const useLockBodyScroll = (isLocked) => {
  const prevPosition = useRef();
  const prevOverflow = useRef();
  const isTouchScreen = useRef(
    'ontouchstart' in document.documentElement ? true : false
  );

  const setOverflowHidden = useCallback(() => {
    if (prevOverflow.current === undefined) {
      prevOverflow.current = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
        scrollBarGap: window.innerWidth - document.documentElement.clientWidth,
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
  }, []);

  const restoreOverflowHiddenSetting = useCallback(() => {
    if (prevOverflow.current !== undefined) {
      document.body.style.overflow = prevOverflow.current?.overflow;
      document.body.style.paddingRight = prevOverflow.current?.paddingRight;

      prevOverflow.current = undefined;
    }
  }, []);

  const setPositionFixed = useCallback(() => {
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
              const bottomBarHeight = innerHeight - window.innerHeight;
              if (bottomBarHeight && scrollY >= innerHeight) {
                // Move the content further up so that the bottom bar doesn't hide it
                document.body.style.top = -(scrollY + bottomBarHeight);
              }
            }),
          300
        );
      }
    });
  }, []);

  const restorePositionSetting = useCallback(() => {
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
  }, [prevPosition]);

  const disableBodyScroll = useCallback(() => {
    if (isTouchScreen.current) {
      setPositionFixed();
    } else {
      setOverflowHidden();
    }
  }, [isTouchScreen]);

  const enableBodyScroll = useCallback(() => {
    if (isTouchScreen.current) {
      restorePositionSetting();
    } else {
      restoreOverflowHiddenSetting();
    }
  }, [isTouchScreen]);

  useLayoutEffect(() => {
    isLocked ? disableBodyScroll() : enableBodyScroll();

    return () => enableBodyScroll();
  }, [isLocked]);
};
