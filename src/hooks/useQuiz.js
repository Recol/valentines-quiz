import { useReducer, useCallback } from 'react';
import { questions, PASSING_SCORE } from '../data/questions';

const SCREENS = {
  WELCOME: 'welcome',
  QUIZ: 'quiz',
  RESULTS: 'results',
  DATE_REVEAL: 'dateReveal',
};

const initialState = {
  screen: SCREENS.WELCOME,
  currentQuestion: 0,
  score: 0,
  answers: [],
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

      const nextQuestion = state.currentQuestion + 1;

      // Last question — go to results or date reveal
      if (nextQuestion >= questions.length) {
        if (newScore >= PASSING_SCORE) {
          return {
            ...state,
            score: newScore,
            answers: newAnswers,
            screen: SCREENS.DATE_REVEAL,
            currentQuestion: nextQuestion,
          };
        }
        return {
          ...state,
          score: newScore,
          answers: newAnswers,
          screen: SCREENS.RESULTS,
          currentQuestion: nextQuestion,
        };
      }

      // Next question
      return {
        ...state,
        score: newScore,
        answers: newAnswers,
        currentQuestion: nextQuestion,
        screen: SCREENS.QUIZ,
      };
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
  const retry = useCallback(() => dispatch({ type: 'RETRY' }), []);

  return {
    ...state,
    totalQuestions: questions.length,
    passingScore: PASSING_SCORE,
    passed: state.score >= PASSING_SCORE,
    currentQuestionData: questions[state.currentQuestion] || null,
    start,
    answer,
    retry,
    SCREENS,
  };
}
