import { useEffect, useRef, useState } from 'react';
import { createCSSVariable } from './utils';
import { debounce } from 'lodash';

const getScrollBarWidth = () => {
  let el = document.createElement('div');
  el.style.cssText = 'overflow:scroll; visibility:hidden; position:absolute;';
  document.body.appendChild(el);
  let width = el.offsetWidth - el.clientWidth;
  el.remove();
  return width;
};

const hasScrollBar = (element) => {
  const root = element ? element : document.body;
  const { scrollTop } = root;

  if (scrollTop > 0) return true;

  root.scrollTop += 10;

  if (scrollTop === root.scrollTop) return false;
  // undoing the change
  root.scrollTop = scrollTop;
  return true;
};

export const useLockedBody = (locked, element) => {
  const hasPassiveEvents = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const passiveTestOptions = {
      get passive() {
        hasPassiveEvents.current = true;
        return undefined;
      },
    };
    window.addEventListener('testPassive', null, passiveTestOptions);
    window.removeEventListener('testPassive', null, passiveTestOptions);
  }, []);

  useEffect(() => {
    const root = element ? element : document.body;

    if (hasScrollBar()) {
      const scrollBarWidth = getScrollBarWidth();

      if (scrollBarWidth) {
        root.style.paddingRight = locked ? `${scrollBarWidth}px` : 'unset';
      }
    }
    root.style.overflow = locked ? 'hidden' : 'unset';
    root.style.touchAction = locked ? 'none' : 'unset';
  }, [locked]);
};

export const useResizeWindow = () => {
  useEffect(() => {
    const syncHeight = () => {
      createCSSVariable('--window-inner-height', `${window.innerHeight}px`);
    };
    syncHeight();

    const debounceSync = debounce(syncHeight, 300);

    window.addEventListener('resize', debounceSync);

    return () => {
      window.removeEventListener('resize', debounceSync);
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

    document.addEventListener('fullscreenchange', changeHandler, false);
    document.addEventListener('mozfullscreenchange', changeHandler, false);
    document.addEventListener('MSFullScreenChange', changeHandler, false);
    document.addEventListener('webkitfullscreenchange', changeHandler, false);

    return () => {
      document.removeEventListener('fullscreenchange', changeHandler);
      document.removeEventListener('mozfullscreenchange', changeHandler);
      document.removeEventListener('MSFullScreenChange', changeHandler);
      document.removeEventListener('webkitfullscreenchange', changeHandler);
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

export const useAbortedEffect = (effect, dependencies) => {
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
  }, [...dependencies]);
};

export const useTimeout = (callback, delay) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.=
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout
  useEffect(() => {
    // Don't schedule if no delay is specified
    if (delay === null) return;

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
};

export const useHover = () => {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);
        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );
  return [value, ref];
};
