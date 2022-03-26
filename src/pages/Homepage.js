import React, { useEffect, useState } from "react";
import { getAllQuizzes } from "../api/quiz";
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import "../styles/index.scss";

export default function Homepage() {
  const [allQuizzes, setAllQuizzes] = useState([]);

  console.log("allQuizzes", allQuizzes);

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  const fetchAllQuizzes = async () => {
    const response = await getAllQuizzes();
    if (response) {
      setAllQuizzes(response.quizzes);
    }
  };

  return (
    <div className="homepage">
      <Header />
      <div className="title-text">Let's see what you got!</div>
      <div className="cards-container">
        {allQuizzes.map((item) => {
          return (
            <QuizCard
              name={item.name}
              difficulty={item.difficulty}
              subject={item.subject}
              numberOfQuestions={item.numberOfQuestions}
              quizId={item._id}
            />
          );
        })}
      </div>
    </div>
  );
}
