const initialState = {
  currentQuiz: null,
  answers: null,
  score: null,
};

const quizReducer = (state = initialState, action) => {
  if (action.type === "UPDATE_CURRENT_QUIZ") {
    state = {
      ...state,
      currentQuiz: { ...action.payload },
    };
    return state;
  }

  if (action.type === "UPDATE_QUIZ_ANSWERS") {
    state = {
      ...state,
      answers: { ...action.payload },
    };
    return state;
  }

  if (action.type === "UPDATE_QUIZ_SCORE") {
    state = {
      ...state,
      score: { ...action.payload },
    };
    return state;
  }

  return state;
};

export default quizReducer;
