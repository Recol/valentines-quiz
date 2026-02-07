import { motion } from 'framer-motion';

export default function FeedbackModal({ message, onDismiss }) {
  return (
    <div className="glass-card p-8 sm:p-10 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-5xl mb-6"
      >
        😄
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl sm:text-2xl font-semibold text-burgundy mb-8"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {message}
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onDismiss}
        className="btn-glow bg-gradient-to-r from-rose-gold to-burgundy text-white
          font-semibold px-8 py-3 rounded-full shadow-lg
          hover:shadow-xl active:scale-95 transition-transform cursor-pointer"
      >
        Continue 💕
      </motion.button>
    </div>
  );
}
