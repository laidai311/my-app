import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from './Backdrop';
import ReactPortal from '../ReactPortal';
import { useEventListener } from 'ahooks';
import { useBodyScroll } from '@/libs/hooks';
import { useCallback } from 'react';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};
const flip = {
  hidden: {
    transform: 'scale(0) rotateX(-360deg)',
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: ' scale(1) rotateX(0deg)',
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: 'scale(0) rotateX(360deg)',
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
const newspaper = {
  hidden: {
    transform: 'scale(0) rotate(720deg)',
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: ' scale(1) rotate(0deg)',
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: 'scale(0) rotate(-720deg)',
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};
const badSuspension = {
  hidden: {
    y: '-100vh',
    opacity: 0,
    transform: 'scale(0) rotateX(-360deg)',
  },
  visible: {
    y: '-25vh',
    opacity: 1,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 15,
      stiffness: 500,
    },
  },
  exit: {
    y: '-100vh',
    opacity: 0,
  },
};
const fade = {
  hidden: {
    opacity: 0,
    scale: 0.75,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    transition: {
      ease: 'easeIn',
      duration: 0.15,
    },
  },
};

const Modal = ({ children, open, onClose }) => {
  const _onClose = useCallback(() => {
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  }, []);
  useEventListener('keydown', (e) => (e.key === 'Escape' ? _onClose() : null));
  useBodyScroll(open);

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <ReactPortal className="w-screen h-screen fixed inset-0">
          <Backdrop onClick={_onClose}>
            <motion.div
              variants={fade}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              className="h-fit w-fit"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
            >
              {children || null}
            </motion.div>
          </Backdrop>
        </ReactPortal>
      ) : null}
    </AnimatePresence>
  );
};
Modal.displayName = 'Modal';
export default Modal;
