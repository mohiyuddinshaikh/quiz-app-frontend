import React, { useEffect, useState } from "react";
import { getAllQuizzes } from "../api/quiz";
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import "../styles/index.scss";
import { Typewriter } from "react-simple-typewriter";
import BackgroundParticle from "../components/BackgroundParticle";

export default function Homepage() {
  const [allQuizzes, setAllQuizzes] = useState([]);

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  const fetchAllQuizzes = async () => {
    try {
      const response = await getAllQuizzes();
      if (response) {
        setAllQuizzes(response.quizzes);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="homepage">
      <Header />
      <BackgroundParticle />
      <div className="title-text">Trivin</div>
      <div className="subtitle__text">
        <Typewriter
          words={["Can you crack'em all ?", "Take a challenge !"]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </div>
      <div className="cards-container">
        {allQuizzes &&
          allQuizzes.map((item, index) => {
            return (
              <QuizCard
                key={index}
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
