import { AnimatePresence, motion } from "framer-motion";
import { debounce } from "lodash";
import { memo, useEffect } from "react";
import Backdrop from "./Backdrop";
import ReactPortal from "./ReactPortal";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};
const flip = {
    hidden: {
        transform: "scale(0) rotateX(-360deg)",
        opacity: 0,
        transition: {
            delay: 0.3,
        },
    },
    visible: {
        transform: " scale(1) rotateX(0deg)",
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        transform: "scale(0) rotateX(360deg)",
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
};
const newspaper = {
    hidden: {
        transform: "scale(0) rotate(720deg)",
        opacity: 0,
        transition: {
            delay: 0.3,
        },
    },
    visible: {
        transform: " scale(1) rotate(0deg)",
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        transform: "scale(0) rotate(-720deg)",
        opacity: 0,
        transition: {
            duration: 0.3,
        },
    },
};
const badSuspension = {
    hidden: {
        y: "-100vh",
        opacity: 0,
        transform: "scale(0) rotateX(-360deg)",
    },
    visible: {
        y: "-25vh",
        opacity: 1,
        transition: {
            duration: 0.2,
            type: "spring",
            damping: 15,
            stiffness: 500,
        },
    },
    exit: {
        y: "-100vh",
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
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.75,
        transition: {
            ease: "easeIn",
            duration: 0.15,
        },
    },
};

const ModalContainer = ({ children, isOpen, onClose }) => {
    useEffect(() => {
        const closeOnEscapeKey = (e) => (e.key === "Escape" ? onClose() : null);
        const syncScroll = () => {
            document.documentElement.style.setProperty(
                "--window-scroll-y",
                `${window.scrollY}px`
            );
        };
        const debounceScroll = debounce(syncScroll, 100);

        window.addEventListener("keydown", closeOnEscapeKey);
        window.addEventListener("scroll", debounceScroll);

        return () => {
            window.removeEventListener("keydown", closeOnEscapeKey);
            window.removeEventListener("scroll", debounceScroll);
            debounceScroll.cancel()
        };
    }, []);

    useEffect(() => {
        const body = document.body;
        if (isOpen) {
            const scrollY =
                document.documentElement.style.getPropertyValue(
                    "--window-scroll-y"
                );
            body.style.position = "fixed";
            body.style.top = `-${scrollY}`;
        } else {
            const scrollY = body.style.top;
            body.style.position = "";
            body.style.top = "";
            window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }
    }, [isOpen]);

    return (
        <AnimatePresence initial={false}>
            {isOpen ? (
                <ReactPortal wrapperId="react-portal-modal-container">
                    <Backdrop isOpen={isOpen} onClick={onClose}>
                        <motion.div
                            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
                            className='h-fit w-fit'
                            role="dialog"
                            aria-modal="true"
                            variants={fade}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {children}
                        </motion.div>
                    </Backdrop>
                </ReactPortal>
            ) : null}
        </AnimatePresence>
    );
};
export default memo(ModalContainer);
