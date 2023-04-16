import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useHover, useTimeout } from 'ahooks';
import React, { useRef } from 'react';

export const Toast = ({ onClose, timeout, color = 'success', children }) => {
  const ref = useRef(null);
  const isHovering = useHover(ref);
  useTimeout(onClose, isHovering ? null : timeout * 1000);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`p-3 rounded-xl flex items-center space-x-3 max-w-xs relative ${
        color === 'success' ? 'bg-green-600 text-white' : ''
      } ${color === 'info' ? 'bg-blue-500 text-white' : ''} ${
        color === 'warning' ? 'bg-orange-500 text-white' : ''
      } ${color === 'error' ? 'bg-red-600 text-white' : ''} `}
      ref={ref}
    >
      <div className="grow">{children}</div>
      <button
        onClick={onClose}
        className="shrink-0 h-8 w-8 p-2 rounded-md hover:bg-black/10 flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </motion.div>
  );
};
