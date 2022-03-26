const UPDATE_CURRENT_QUIZ = "UPDATE_CURRENT_QUIZ";
const UPDATE_QUIZ_ANSWERS = "UPDATE_QUIZ_ANSWERS";
const UPDATE_QUIZ_SCORE = "UPDATE_QUIZ_SCORE";

export function updateCurrentQuiz(data) {
  return {
    type: UPDATE_CURRENT_QUIZ,
    payload: data,
  };
}

export function updateQuizAnswers(data) {
  return {
    type: UPDATE_QUIZ_ANSWERS,
    payload: data,
  };
}

export function updateQuizScore(data) {
  return {
    type: UPDATE_QUIZ_SCORE,
    payload: data,
  };
}
