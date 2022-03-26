const axios = require("axios");

const TEST_URL = process.env.REACT_APP_TEST_URL;

export async function getAllQuizzes() {
  try {
    const response = await axios.get(`${TEST_URL}/api/quiz/get-all-quizzes`);
    if (response && response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
}

export async function getQuizQuestions(payload) {
  try {
    const response = await axios.post(
      `${TEST_URL}/api/quiz-questions/get-quiz-questions`,
      payload
    );
    if (response && response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
}

export async function submitUserRecord(payload) {
  try {
    const response = await axios.post(
      `${TEST_URL}/api/user-records/submit-response`,
      payload
    );
    if (response && response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
}

export async function getQuizLeaderboard(payload) {
  try {
    const response = await axios.post(
      `${TEST_URL}/api/user-records/get-leaderboard`,
      payload
    );
    if (response && response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
}
