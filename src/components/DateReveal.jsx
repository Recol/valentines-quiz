import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dateDetails } from '../data/questions';
import { fireHeartConfetti } from '../utils/confetti';

export default function DateReveal({ score, total }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fireHeartConfetti();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleFlip = () => {
    if (!flipped) {
      setFlipped(true);
      setTimeout(() => fireHeartConfetti(), 400);
    }
  };

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <p className="text-lg text-charcoal/70 mb-1">
          You scored <span className="font-bold text-rose-gold">{score}/{total}</span>
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-shimmer mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          You Did It! 🎉
        </h2>
        <p className="text-charcoal/60">Tap the card to reveal your surprise...</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 150, damping: 20 }}
      >
        <div
          className="flip-card mx-auto cursor-pointer"
          style={{ width: '100%', maxWidth: '400px', height: '420px' }}
          onClick={handleFlip}
        >
          <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
            {/* Front of card */}
            <div className="flip-card-front glass-card flex flex-col items-center justify-center p-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-6xl mb-4"
              >
                🎁
              </motion.div>
              <p
                className="text-2xl font-bold text-burgundy"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Tap to Reveal!
              </p>
              <p className="text-charcoal/50 mt-2 text-sm">Your Valentine's surprise awaits...</p>
            </div>

            {/* Back of card */}
            <div className="flip-card-back glass-card flex flex-col items-center justify-center p-6 sm:p-8"
              style={{ background: 'linear-gradient(135deg, rgba(136,14,79,0.15), rgba(183,110,121,0.2), rgba(255,193,204,0.25))' }}
            >
              <div className="text-3xl mb-2">🌹</div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-burgundy mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {dateDetails.restaurant}
              </h3>
              <p className="text-rose-gold font-medium text-base mb-3">{dateDetails.location}</p>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-center gap-2 text-charcoal/80">
                  <span>📅</span>
                  <span className="font-medium text-sm">{dateDetails.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-charcoal/80">
                  <span>🕘</span>
                  <span className="font-medium text-sm">{dateDetails.time}</span>
                </div>
              </div>

              <p className="text-charcoal/60 text-xs mb-4 italic"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Dine in or order in — your choice! 💕
              </p>

              <div className="flex flex-col sm:flex-row gap-2 w-full items-center justify-center">
                <a
                  href={dateDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block bg-gradient-to-r from-rose-gold to-burgundy text-white
                    font-semibold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl
                    transition-all hover:scale-105 text-sm"
                >
                  Dine In 🍽️
                </a>
                <a
                  href={dateDetails.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block bg-gradient-to-r from-burgundy to-rose-gold text-white
                    font-semibold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl
                    transition-all hover:scale-105 text-sm"
                >
                  Order In 🛋️
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 150, damping: 20 }}
          className="mt-6 glass-card p-5 mx-auto max-w-sm"
        >
          <p className="text-2xl mb-2">🎁✨</p>
          <p
            className="text-lg font-semibold text-burgundy mb-1"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            ...and a mystery gift
          </p>
          <p className="text-charcoal/50 text-sm">
            Something special is waiting for you on the day!
          </p>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: flipped ? 1.5 : 1 }}
        className="mt-8 text-charcoal/40 text-sm italic"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {dateDetails.message} 💕
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: flipped ? 2 : 1.5 }}
        className="mt-4 text-charcoal/30 text-xs"
      >
        Made with ❤️ by Decklin
      </motion.p>
    </div>
  );
}
