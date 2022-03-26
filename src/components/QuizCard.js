import React from "react";
import "../styles/index.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as QuizActions from "../store/actions/quiz.action";

export default function QuizCard(props) {
  const { name, subject, difficulty, numberOfQuestions, quizId } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const takeQuiz = () => {
    navigate("/quiz");
  };

  const handleStart = () => {
    dispatch(QuizActions.updateCurrentQuiz({ quizId }));
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>{name}</div>
        <div>
          {difficulty === 0 ? "Easy" : difficulty === 1 ? "Medium" : "Hard"}
        </div>
      </div>
      <p>Subject: {subject}</p>
      <p>No. of Questions: {numberOfQuestions}</p>
      <div className="card-cta-container" onClick={takeQuiz}>
        <div className="card-cta" onClick={handleStart}>
          Start
        </div>
      </div>
    </div>
  );
}
