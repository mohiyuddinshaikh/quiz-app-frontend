import React, { useEffect, useState } from "react";
import { getAllQuizzes } from "../api/quiz";
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import "../styles/index.scss";
import { Typewriter } from "react-simple-typewriter";
import BackgroundParticle from "../components/BackgroundParticle";
import Modal from "react-modal";
import useIsMobile from "../hooks/isMobile";
import { sidebarBackgroundColor } from "../constants";
import { FaTools } from "react-icons/fa";

export default function Homepage() {
  let isMobile = useIsMobile();

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

  const [createQuizModal, setCreateQuizModal] = useState(false);

  function openCreateQuizModal() {
    setCreateQuizModal(true);
  }

  function closeCreateQuizModal() {
    setCreateQuizModal(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: isMobile ? "80%" : "",
    },
    overlay: {
      backgroundColor: sidebarBackgroundColor,
      opacity: 0.9,
    },
  };

  const CreateQuizModal = () => {
    const toolsStyle = {};

    return (
      <Modal
        isOpen={createQuizModal}
        onRequestClose={closeCreateQuizModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="create-quiz-modal__container">
          <div className="headline">
            This feature is currently under development{" "}
            <FaTools
              style={{
                color: "#1d9bf0",
                marginLeft: "10px",
                fontSize: "20px",
              }}
            />
          </div>
          <div className="feature__list">
            <li>Create your own quiz</li>
            <li>Share it with your friends</li>
            <li>
              Only people you share this link with will be able to answer that
              quiz
            </li>
          </div>
          <div>close</div>
        </div>
      </Modal>
    );
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
        {allQuizzes?.length ? (
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
          })
        ) : (
          <div className="waitCopy">
            Please wait 30 seconds and refresh. The free tier on Render requires
            extra time for the initial load for the first time.
          </div>
        )}
      </div>
      {/* <div className="create-own-course__container">
        <div className="create-own-course__btn" onClick={openCreateQuizModal}>
          Create Your Own Quiz
        </div>
      </div> */}
      {/* <CreateQuizModal /> */}
    </div>
  );
}
