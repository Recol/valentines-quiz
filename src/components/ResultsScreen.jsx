import { motion } from 'framer-motion';

export default function ResultsScreen({ score, total, passingScore, onRetry }) {
  return (
    <div className="glass-card p-8 sm:p-12 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-6xl mb-6"
      >
        🥺
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-3xl font-bold text-burgundy mb-4"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Almost there!
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-lg text-charcoal/70 mb-2">
          You scored <span className="font-bold text-rose-gold">{score}</span> out of{' '}
          <span className="font-bold">{total}</span>
        </p>
        <p className="text-charcoal/50 mb-8">
          You need at least {passingScore} correct to unlock your surprise! Try again, you've got this! 💪
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 15 }}
        onClick={onRetry}
        className="pulse-gentle btn-glow bg-gradient-to-r from-rose-gold to-burgundy text-white
          font-semibold text-lg px-10 py-4 rounded-full shadow-lg
          hover:shadow-xl active:scale-95 transition-transform cursor-pointer"
      >
        Try Again! 💕
      </motion.button>
    </div>
  );
}
