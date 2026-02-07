import { AnimatePresence, motion } from 'framer-motion';
import { useQuiz } from './hooks/useQuiz';
import FloatingHearts from './components/FloatingHearts';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import ResultsScreen from './components/ResultsScreen';
import DateReveal from './components/DateReveal';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

const pageTransition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
  mass: 0.8,
};

function App() {
  const quiz = useQuiz();

  return (
    <div className="bg-gradient-animated min-h-dvh relative overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {quiz.screen === quiz.SCREENS.WELCOME && (
            <motion.div
              key="welcome"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full max-w-lg"
            >
              <WelcomeScreen onStart={quiz.start} />
            </motion.div>
          )}

          {quiz.screen === quiz.SCREENS.QUIZ && (
            <motion.div
              key={`question-${quiz.currentQuestion}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full max-w-lg"
            >
              <ProgressBar current={quiz.currentQuestion} total={quiz.totalQuestions} />
              <QuestionCard
                question={quiz.currentQuestionData}
                questionNumber={quiz.currentQuestion + 1}
                onAnswer={quiz.answer}
              />
            </motion.div>
          )}

          {quiz.screen === quiz.SCREENS.RESULTS && (
            <motion.div
              key="results"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full max-w-lg"
            >
              <ResultsScreen
                score={quiz.score}
                total={quiz.totalQuestions}
                passingScore={quiz.passingScore}
                onRetry={quiz.retry}
              />
            </motion.div>
          )}

          {quiz.screen === quiz.SCREENS.DATE_REVEAL && (
            <motion.div
              key="dateReveal"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="w-full max-w-lg"
            >
              <DateReveal score={quiz.score} total={quiz.totalQuestions} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
