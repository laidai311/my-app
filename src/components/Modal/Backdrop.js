import { motion } from "framer-motion";
import { memo, useEffect } from "react";

const Backdrop = ({ children, onClick }) => {
    useEffect(() => {
        const syncHeight = () => {
            document.documentElement.style.setProperty(
                "--window-inner-height",
                `${window.innerHeight}px`
            );
        };
        syncHeight();

        window.addEventListener("resize", syncHeight);

        return () => {
            window.removeEventListener("resize", syncHeight);
        };
    }, []);

    return (
        <motion.div
            className="w-full h-[var(--window-inner-height)] bg-[#000000e1] flex justify-center overflow-y-auto pointer-events-auto"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
};

Backdrop.displayName = "Backdrop";

export default memo(Backdrop);
