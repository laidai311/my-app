import { SpinnerWhiteIcon } from "./ProviderIcon";
import { motion } from "framer-motion";

const FullPageLoader = (props) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...props}
        className="flex justify-center items-center min-h-[var(--window-inner-height)] bg-primary-focus fixed inset-0 pointer-events-none"
    >
        <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-fit h-fit"
        >
            <SpinnerWhiteIcon className="animate-spin-steps-12 w-10 h-10" />
        </motion.div>
    </motion.div>
);

export default FullPageLoader;
