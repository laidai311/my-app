import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

export const Button = ({
  children,
  loading,
  className,
  color = 'default',
  isLink,
  shape = 'round',
  ...restProps
}) => {
  return React.cloneElement(
    isLink ? <Link /> : <button />,
    {
      disabled: !!loading,
      className: `h-10 inline-flex justify-center items-center space-x-1.5 border shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm active:scale-90 transition-all select-none ${
        color === 'error'
          ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 border-transparent disabled:bg-red-6/90'
          : ''
      } ${
        color === 'primary'
          ? 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
          : ''
      } ${
        color === 'default'
          ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500'
          : ''
      } ${
        color === 'text'
          ? 'border-transparent shadow-none bg-white text-gray-700 hover:bg-gray-100 focus:ring-indigo-500'
          : ''
      } ${shape === 'circle' ? 'rounded-full w-10' : ''} ${
        shape === 'round' ? 'rounded-md px-4 py-2' : ''
      } ${className || ''}`,
      ...restProps,
    },
    loading ? (
      <FontAwesomeIcon icon={faCircleNotch} className="animate-spin h-5 w-5" />
    ) : (
      children || ''
    )
  );
};

export const Input = ({ placeholder, label, ...restProps }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative h-14 inline-block`}
    >
      <input
        {...restProps}
        className="peer h-full w-full appearance-none outline-none focus:outline-none px-3 pt-6 pb-2 bg-gray-100 transition-all rounded-md border-b border-gray-200 focus:border-indigo-500 hover:bg-gray-200/70 focus:bg-gray-100 disabled:pointer-events-none disabled:opacity-90"
        placeholder=" "
      />
      <motion.label className="after:content[' '] pointer-events-none absolute inset-0 px-3 flex h-full w-full select-none text-gray-400 text-xs peer-focus:text-xs peer-placeholder-shown:text-base transition-all leading-7 peer-focus:leading-7 peer-placeholder-shown:leading-[56px] rounded-md overflow-hidden after:absolute after:bottom-0 after:left-0 after:transition-transform after:border-b-2 after:border-b-indigo-500 after:w-full after:scale-x-0 peer-focus:after:scale-x-100 peer-disabled:text-gray-300">
        {placeholder || label || ''}
      </motion.label>
    </motion.div>
  );
};
