import React from 'react';
import { useHover, useTimeout } from '@/libs/hooks';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const options = {
  success: '#36d399',
  info: '#3abff8',
  warning: '#fbbd23',
  error: '#f87272',
};
const getColorType = (type) =>
  options.hasOwnProperty(type) ? options[type] : options.success;

export const Toast = (props) => {
  const [isHovered, hoverRef] = useHover();
  useTimeout(props.close, isHovered ? null : props.timeout * 1000);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="border p-3 rounded-xl flex items-center space-x-3 max-w-xs relative"
      style={{ backgroundColor: getColorType(props.type) }}
      ref={hoverRef}
    >
      <div className="grow">{props.children}</div>
      <button
        onClick={props.close}
        className="shrink-0 h-8 w-8 p-2 rounded-md hover:bg-black/10 flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </motion.div>
  );
};
