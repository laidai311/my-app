import { motion } from 'framer-motion';

const Backdrop = ({ className, ...props }) => {
    return (
        <motion.div
            {...props}
            className={`bg-[#00000090] w-full h-full overflow-auto flex justify-center ${
                className ?? ''
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        />
    );
};

Backdrop.displayName = 'Backdrop';

export default Backdrop;
