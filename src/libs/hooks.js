import { createCSSVariable } from './utils';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useCallback, useEffect, useRef } from 'react';
import { useDebounceFn, useEventListener } from 'ahooks';

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
