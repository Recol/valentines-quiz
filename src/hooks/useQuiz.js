import { useReducer, useCallback } from 'react';
import { questions, PASSING_SCORE } from '../data/questions';

const SCREENS = {
  WELCOME: 'welcome',
  QUIZ: 'quiz',
  FEEDBACK: 'feedback',
  RESULTS: 'results',
  DATE_REVEAL: 'dateReveal',
};

const initialState = {
  screen: SCREENS.WELCOME,
  currentQuestion: 0,
  score: 0,
  answers: [],
  lastAnswer: null,
  feedbackMessage: null,
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'START':
      return {
        ...initialState,
        screen: SCREENS.QUIZ,
      };

    case 'ANSWER': {
      const question = questions[state.currentQuestion];
      const selectedOption = question.options[action.optionIndex];
      const isCorrect = selectedOption.isCorrect;
      const newScore = isCorrect ? state.score + 1 : state.score;
      const newAnswers = [...state.answers, { questionId: question.id, isCorrect, selected: action.optionIndex }];

      // Show custom feedback for wrong answers
      if (!isCorrect && question.wrongFeedback) {
        return {
          ...state,
          score: newScore,
          answers: newAnswers,
          lastAnswer: { isCorrect, optionIndex: action.optionIndex },
          screen: SCREENS.FEEDBACK,
          feedbackMessage: question.wrongFeedback,
        };
      }

      // Move to next question or results
      const nextQuestion = state.currentQuestion + 1;
      if (nextQuestion >= questions.length) {
        if (newScore >= PASSING_SCORE) {
          return {
            ...state,
            score: newScore,
            answers: newAnswers,
            lastAnswer: { isCorrect, optionIndex: action.optionIndex },
            screen: SCREENS.DATE_REVEAL,
            currentQuestion: nextQuestion,
          };
        }
        return {
          ...state,
          score: newScore,
          answers: newAnswers,
          lastAnswer: { isCorrect, optionIndex: action.optionIndex },
          screen: SCREENS.RESULTS,
          currentQuestion: nextQuestion,
        };
      }

      return {
        ...state,
        score: newScore,
        answers: newAnswers,
        lastAnswer: { isCorrect, optionIndex: action.optionIndex },
        currentQuestion: nextQuestion,
        screen: SCREENS.QUIZ,
      };
    }

    case 'DISMISS_FEEDBACK': {
      const nextQuestion = state.currentQuestion + 1;
      if (nextQuestion >= questions.length) {
        if (state.score >= PASSING_SCORE) {
          return { ...state, screen: SCREENS.DATE_REVEAL, currentQuestion: nextQuestion };
        }
        return { ...state, screen: SCREENS.RESULTS, currentQuestion: nextQuestion };
      }
      return { ...state, screen: SCREENS.QUIZ, currentQuestion: nextQuestion };
    }

    case 'RETRY':
      return {
        ...initialState,
        screen: SCREENS.QUIZ,
      };

    default:
      return state;
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const start = useCallback(() => dispatch({ type: 'START' }), []);
  const answer = useCallback((optionIndex) => dispatch({ type: 'ANSWER', optionIndex }), []);
  const dismissFeedback = useCallback(() => dispatch({ type: 'DISMISS_FEEDBACK' }), []);
  const retry = useCallback(() => dispatch({ type: 'RETRY' }), []);

  return {
    ...state,
    totalQuestions: questions.length,
    passingScore: PASSING_SCORE,
    passed: state.score >= PASSING_SCORE,
    currentQuestionData: questions[state.currentQuestion] || null,
    start,
    answer,
    dismissFeedback,
    retry,
    SCREENS,
  };
}
