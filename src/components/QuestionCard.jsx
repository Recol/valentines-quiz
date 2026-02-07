import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import DodgeButton from './DodgeButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const buttonBase =
  'w-full py-4 px-6 rounded-2xl font-medium text-base sm:text-lg transition-all duration-300 cursor-pointer border-2';

const buttonNormal =
  'bg-white/40 border-white/50 text-charcoal hover:bg-rose-gold hover:text-white hover:border-rose-gold hover:shadow-lg active:scale-[0.97]';

const buttonCorrect =
  'bg-emerald-500/80 border-emerald-400 text-white shadow-lg scale-[1.02]';

const buttonWrong =
  'bg-red-400/80 border-red-300 text-white shadow-lg';

const buttonDisabled =
  'bg-white/20 border-white/30 text-charcoal/40 cursor-default';

const FEEDBACK_DELAY = 1400;

export default function QuestionCard({ question, questionNumber, onAnswer }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [locked, setLocked] = useState(false);

  const handleAnswer = useCallback((index) => {
    if (locked) return;
    setSelectedIndex(index);
    setLocked(true);

    setTimeout(() => {
      onAnswer(index);
    }, FEEDBACK_DELAY);
  }, [locked, onAnswer]);

  if (!question) return null;

  const answered = selectedIndex !== null;
  const isCorrectAnswer = answered && question.options[selectedIndex]?.isCorrect;

  const getButtonClass = (index) => {
    if (!answered) return `${buttonBase} ${buttonNormal}`;
    if (index === selectedIndex) {
      return `${buttonBase} ${question.options[index].isCorrect ? buttonCorrect : buttonWrong}`;
    }
    // Highlight the correct answer too so they learn
    if (question.options[index].isCorrect) {
      return `${buttonBase} ${buttonCorrect}`;
    }
    return `${buttonBase} ${buttonDisabled}`;
  };

  return (
    <div className="glass-card p-6 sm:p-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <span className="inline-block text-4xl mb-3">
            {questionNumber === 6 ? '💍' : '💭'}
          </span>
          <h2
            className="text-2xl sm:text-3xl font-bold text-burgundy"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {question.question}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.div key={index} variants={itemVariants}>
              {option.shouldDodge && !answered ? (
                <DodgeButton
                  text={option.text}
                  onClick={() => handleAnswer(index)}
                  className={getButtonClass(index)}
                />
              ) : (
                <button
                  onClick={() => handleAnswer(index)}
                  disabled={locked}
                  className={getButtonClass(index)}
                >
                  {option.text}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Inline feedback message */}
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="mt-6 text-center"
          >
            {isCorrectAnswer ? (
              <p className="text-lg font-semibold text-emerald-600">
                Correct! 🎉
              </p>
            ) : (
              <p className="text-lg font-semibold text-red-500">
                {question.wrongFeedback || "Not quite! 😅"}
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
