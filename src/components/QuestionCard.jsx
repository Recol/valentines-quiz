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
  'w-full py-4 px-6 rounded-2xl font-medium text-base sm:text-lg transition-all duration-200 cursor-pointer border-2';

const buttonNormal =
  'bg-white/40 border-white/50 text-charcoal hover:bg-rose-gold hover:text-white hover:border-rose-gold hover:shadow-lg active:scale-[0.97]';

export default function QuestionCard({ question, questionNumber, onAnswer }) {
  if (!question) return null;

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
              {option.shouldDodge ? (
                <DodgeButton
                  text={option.text}
                  onClick={() => onAnswer(index)}
                  className={`${buttonBase} ${buttonNormal}`}
                />
              ) : (
                <button
                  onClick={() => onAnswer(index)}
                  className={`${buttonBase} ${buttonNormal}`}
                >
                  {option.text}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
