import { motion } from 'framer-motion';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="glass-card p-8 sm:p-12 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="text-6xl sm:text-7xl mb-6"
      >
        💝
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-burgundy mb-4"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        You solved the puzzle, so here's an early Valentine's Day gift!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-charcoal/70 text-lg sm:text-xl mb-2"
      >
        I made you a little quiz...
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-charcoal/50 text-sm sm:text-base mb-8"
      >
        Answer correctly to unlock your surprise! 🎁
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 15 }}
        onClick={onStart}
        className="pulse-gentle btn-glow bg-gradient-to-r from-rose-gold to-burgundy text-white
          font-semibold text-lg px-10 py-4 rounded-full shadow-lg
          hover:shadow-xl active:scale-95 transition-transform cursor-pointer"
      >
        Let's Go! 💕
      </motion.button>
    </div>
  );
}
