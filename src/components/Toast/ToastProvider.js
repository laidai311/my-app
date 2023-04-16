import { AnimatePresence } from 'framer-motion';
import { Toast } from './Toast';
import { ToastContext } from './ToastContext';
import React, { useState, useMemo } from 'react';
import ReactPortal from '../ReactPortal';

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
  const onClose = (id) =>
    setToasts((curr) => curr.filter((it) => it.id !== id));
  const val = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={val}>
      {props.children}
      {toasts.length > 0 && (
        <ReactPortal
          className="fixed right-0 bottom-0 overflow-hidden p-5 space-y-3"
          style={{ zIndex: 1001 }}
        >
          <AnimatePresence>
            {toasts.map((it) => (
              <Toast
                key={it.id}
                color={it.type}
                onClose={() => onClose(it.id)}
                timeout={TIMEOUT}
              >
                {it.content}
              </Toast>
            ))}
          </AnimatePresence>
        </ReactPortal>
      )}
    </ToastContext.Provider>
  );
};
