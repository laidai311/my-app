import { motion } from 'framer-motion';

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      className="w-full min-h-screen h-[var(--window-height)] bg-[#00000090] overflow-y-auto pointer-events-auto flex justify-center items-center"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children || null}
    </motion.div>
  );
};

Backdrop.displayName = 'Backdrop';

export default Backdrop;
