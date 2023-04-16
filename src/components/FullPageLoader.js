import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const FullPageLoader = (props) => (
  <motion.div
    {...props}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex justify-center items-center min-h-[var(--window-inner-height)] bg-primary-focus fixed inset-0 z-50 pointer-events-none"
  >
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="w-10 h-10"
    >
      <FontAwesomeIcon
        icon={faCircleNotch}
        className="animate-spin w-10 h-10 text-white"
      />
    </motion.div>
  </motion.div>
);

export default FullPageLoader;
