import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const MAX_DODGES = 3;

export default function DodgeButton({ text, onClick, className }) {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHidden, setIsHidden] = useState(false);
  const buttonRef = useRef(null);

  const dodge = useCallback(() => {
    if (dodgeCount >= MAX_DODGES) return;

    const newCount = dodgeCount + 1;
    setDodgeCount(newCount);

    if (newCount >= MAX_DODGES) {
      // After max dodges, button shrinks away
      setIsHidden(true);
      return;
    }

    // Random position within reasonable bounds
    const maxX = 150;
    const maxY = 80;
    const newX = (Math.random() - 0.5) * maxX * 2;
    const newY = (Math.random() - 0.5) * maxY * 2;
    setPosition({ x: newX, y: newY });
  }, [dodgeCount]);

  const handleInteraction = useCallback((e) => {
    if (dodgeCount < MAX_DODGES) {
      e.preventDefault();
      e.stopPropagation();
      dodge();
    }
  }, [dodgeCount, dodge]);

  if (isHidden) {
    return (
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, type: 'spring' }}
        className="h-14"
      />
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
      onClick={(e) => {
        if (dodgeCount >= MAX_DODGES) {
          onClick();
        } else {
          handleInteraction(e);
        }
      }}
      className={className}
    >
      {text}
    </motion.button>
  );
}
