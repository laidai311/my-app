import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  loading,
  className,
  color = 'default',
  ...restProps
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      disabled={!!loading}
      type="button"
      {...restProps}
      className={`w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm ${
        color === 'error'
          ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 border-transparent'
          : ''
      } ${
        color === 'primary'
          ? 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
          : ''
      } ${
        color === 'default'
          ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500'
          : ''
      } ${className || ''}`}
    >
      {loading ? (
        <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
      ) : (
        children || ''
      )}
    </motion.button>
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
