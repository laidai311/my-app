import { useDetectKeyboardOpen } from '@/libs/hooks';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

const Backdrop = ({ children, onClick }) => {
  const ref = useRef();
  const preventDefault = useCallback((e) => {
    e.preventDefault();
  }, []);
  // const isKeyboardOpen = useDetectKeyboardOpen();

  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current.addEventListener('touchmove', preventDefault);
  //   }
  //   return () => {
  //     if (ref?.current) {
  //       ref.current.removeEventListener('touchmove', preventDefault);
  //     }
  //   };
  // }, [ref?.current]);

  return (
    <motion.div
      ref={ref}
      className={`bg-[#00000090] w-full h-full overflow-auto flex justify-center items-center`}
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
