export const questions = [
  {
    id: 1,
    question: "What is Decklin's favourite food?",
    options: [
      { text: "Greggs", isCorrect: false },
      { text: "Fish", isCorrect: true },
      { text: "Chocolate", isCorrect: false },
    ],
    wrongFeedback: null,
  },
  {
    id: 2,
    question: "When is Decklin's birthday?",
    options: [
      { text: "June the 17th", isCorrect: false },
      { text: "Every day of the year", isCorrect: true },
      { text: "June 17th, 2000", isCorrect: false },
    ],
    wrongFeedback: "It's actually every day of the year! 🎂",
  },
  {
    id: 3,
    question: "Are you clumsy?",
    options: [
      { text: "Yes", isCorrect: true },
      { text: "No", isCorrect: false },
    ],
    wrongFeedback: "Looks like you clumsily clicked the wrong answer! 😅",
  },
  {
    id: 4,
    question: "What is Decklin's favourite animal?",
    options: [
      { text: "An eagle", isCorrect: false },
      { text: "A cheetah", isCorrect: true },
      { text: "A tiger", isCorrect: false },
    ],
    wrongFeedback: null,
  },
  {
    id: 5,
    question: "Where does Emily live?",
    options: [
      { text: "Leeds", isCorrect: false },
      { text: "Glasgow", isCorrect: true },
    ],
    wrongFeedback: null,
  },
  {
    id: 6,
    question: "Will you marry Decklin?",
    options: [
      { text: "Yes", isCorrect: true },
      { text: "No", isCorrect: false, shouldDodge: true },
    ],
    wrongFeedback: null,
  },
];

export const dateDetails = {
  restaurant: "Manjaro's",
  location: "Leeds",
  date: "Saturday, February 14th, 2026",
  time: "9:00 PM",
  url: "https://manjaros.co.uk/leeds/",
  message: "I can't wait to spend Valentine's Day with you!",
};

export const PASSING_SCORE = 4;
