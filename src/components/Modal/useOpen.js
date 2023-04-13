import { useState } from "react";

const useOpen = (defaultValue = false) => {
    const [isOpen, setIsOpen] = useState(defaultValue);

    const onClose = () => setIsOpen(false);
    const onOpen = () => setIsOpen(true);
    const onToggle = () => setIsOpen(!isOpen);

    return { isOpen, onClose, onOpen, onToggle };
};

export default useOpen;
