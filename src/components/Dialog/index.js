import { AnimatePresence, motion } from 'framer-motion';
import { useCallback } from 'react';
import { useEventListener } from 'ahooks';
import { useLockBodyScroll } from 'lib/utils/hooks';
import Backdrop from './Backdrop';
import ReactPortal from './ReactPortal';

const fade = {
    hidden: {
        opacity: 0,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: 'easeOut'
        }
    },
    exit: {
        opacity: 0,
        scale: 0.75,
        transition: {
            ease: 'easeIn',
            duration: 0.15
        }
    }
};

const Dialog = ({
    open,
    onClose,
    backdropClassName,
    backdropStyle,
    backdropId,
    portalZIndex = 1000,
    portalId = 'dialog-wrapper',
    ...props
}) => {
    useEventListener('keydown', (e) => (e.key === 'Escape' ? _onClose() : null));
    useLockBodyScroll(open);

    const _onClose = useCallback(() => {
        if (onClose && typeof onClose === 'function') {
            onClose();
        }
    }, []);

    return (
        <AnimatePresence initial={false}>
            {open ? (
                <ReactPortal
                    id={portalId}
                    style={{ zIndex: portalZIndex }}
                    className="w-screen h-[var(--window-height)] fixed inset-0 overflow-hidden">
                    <Backdrop
                        id={backdropId}
                        onClick={_onClose}
                        style={backdropStyle}
                        className={backdropClassName}>
                        <motion.div
                            {...props}
                            role="dialog"
                            aria-modal="true"
                            onClick={(e) => e.stopPropagation()}
                            variants={fade}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        />
                    </Backdrop>
                </ReactPortal>
            ) : null}
        </AnimatePresence>
    );
};
Dialog.displayName = 'Dialog';
export default Dialog;
