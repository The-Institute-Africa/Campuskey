
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const circleVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: (i) => ({
      scale: [0, 1.2, 1],
      opacity: [0, 0.5, 0.3, 0],
      transition: {
        delay: i * 0.5,
        duration: 4,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    }),
  };

  const circles = [
    { size: '300px', top: '10%', left: '20%' },
    { size: '200px', top: '50%', left: '80%' },
    { size: '400px', top: '70%', left: '10%' },
    { size: '150px', top: '25%', left: '90%' },
    { size: '250px', top: '80%', left: '60%' },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {circles.map((circle, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={circleVariants}
          initial="initial"
          animate="animate"
          style={{
            position: 'absolute',
            width: circle.size,
            height: circle.size,
            top: circle.top,
            left: circle.left,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(20px)',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
