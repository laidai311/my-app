import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const Drawer = ({ children, width = 320 }) => {
  const [isActive, setIsActive] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isActive ? 'active' : 'inactive');
  }, [isActive, controls]);

  const sidekickBodyStyles = {
    active: {
      x: 0,
    },
    inactive: {
      x: -width,
    },
  };

  const menuHandlerStyles = {
    active: {
      x: 0,
      color: '#000',
    },
    inactive: {
      x: 60,
      color: '#000',
    },
  };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2000 }}>
      {/* <div className="absolute inset-0 pointer-events-auto z-0 bg-black/10" /> */}

      <motion.div
        style={{ zIndex: 1, maxWidth: width }}
        className="relative pointer-events-auto bg-indigo-600 p-7 pr-14 h-full box-border"
        drag="x"
        dragElastic={0.1}
        dragConstraints={{
          left: -width,
          right: 0,
        }}
        dragMomentum={false}
        onDragEnd={(_event, info) => {
          const isDraggingLeft = info.offset.x < 0;
          const multiplier = isDraggingLeft ? 1 / 4 : 2 / 3;
          const threshold = width * multiplier;

          if (Math.abs(info.point.x) > threshold && isActive) {
            setIsActive(false);
          } else if (Math.abs(info.point.x) < threshold && !isActive) {
            setIsActive(true);
          } else {
            controls.start(isActive ? 'active' : 'inactive');
          }
        }}
        animate={controls}
        variants={sidekickBodyStyles}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      >
        <motion.button
          className="bg-transparent absolute top-3"
          style={{ left: width - 60 }}
          onTap={() => setIsActive((s) => !s)}
          variants={menuHandlerStyles}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          {isActive ? 'Close' : 'Open'}
        </motion.button>
        {children}
      </motion.div>
    </div>
  );
};

export default Drawer;
