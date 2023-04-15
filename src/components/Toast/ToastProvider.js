import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { ToastContext } from './ToastContext';
import { Toast } from './Toast';
import { motion, AnimatePresence } from 'framer-motion';

// Create a random ID
function generateUEID() {
  let first = (Math.random() * 46656) | 0;
  let second = (Math.random() * 46656) | 0;
  first = ('000' + first.toString(36)).slice(-3);
  second = ('000' + second.toString(36)).slice(-3);

  return first + second;
}
const LIMIT = 3;
const TIMEOUT = 5;

export const ToastProvider = (props) => {
  const [toasts, setToasts] = useState([]);
  const open = (val) =>
    setToasts((curr) => {
      const arr = [...curr, { ...val, id: generateUEID() }];
      return curr?.length >= LIMIT ? arr.slice(toasts?.length - LIMIT) : arr;
    });
  const close = (id) => setToasts((curr) => curr.filter((it) => it.id !== id));
  const val = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={val}>
      {props.children}

      {createPortal(
        <motion.div className="absolute right-0 bottom-0 overflow-hidden p-5 space-y-3">
          <AnimatePresence>
            {toasts.map((it) => (
              <Toast
                key={it.id}
                type={it.type}
                close={() => close(it.id)}
                timeout={TIMEOUT}
              >
                {it.content}
              </Toast>
            ))}
          </AnimatePresence>
        </motion.div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
