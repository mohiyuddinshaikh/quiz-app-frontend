import React, { useEffect, useState } from "react";
import { getQuizQuestions, submitUserRecord } from "../api/quiz";
import "../styles/quizpage.scss";
import * as constants from "../constants";
import Header from "../components/Header";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as QuizActions from "../store/actions/quiz.action";
import { Loader } from "../components/Loader";

export default function Quiz() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [submitLoader, setSubmitLoader] = useState(false);

  const currentQuiz = useSelector((state) => state.quizReducer.currentQuiz);
  const userDetails = useSelector((state) => state.quizReducer.users);

  const brightGreen = "#1ed760";
  const primaryBackgroundColor = "#15202b";
  const sidebarBackgroundColor = "#1e2732";

  let sidebarClass = isSidebarOpen ? "sidebar__quiz open" : "sidebar__quiz";

  useEffect(() => {
    fetchQuizQuestions();
  }, [currentQuiz]);

  const fetchQuizQuestions = async () => {
    try {
      if (!currentQuiz) {
        navigate("/");
      }
      const response = await getQuizQuestions({
        quizId: currentQuiz.quizId,
      });
      if (response.data) {
        setQuestions(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const SidebarToggleButton = () => {
    return (
      <div
        className="quiz__navigation-buttons"
        onClick={() => setIsSidebarOpen((oldProp) => !oldProp)}
      >
        {isSidebarOpen ? "Close" : "Open"} sidebar
      </div>
    );
  };

  const handleOptionSelect = (optionIndex, optionText) => {
    let tempQuestions = [...questions];
    if (
      (questions[currentQuestion - 1].selected ||
        questions[currentQuestion - 1].selected === 0) &&
      questions[currentQuestion - 1].selected === optionIndex
    ) {
      delete tempQuestions[currentQuestion - 1].selected;
      delete tempQuestions[currentQuestion - 1].answer;
      setQuestions(tempQuestions);
    } else {
      tempQuestions[currentQuestion - 1].selected = optionIndex;
      tempQuestions[currentQuestion - 1].answer = optionText;
      setQuestions(tempQuestions);
      handleNext();
    }
  };

  const handleBack = () => {
    setCurrentQuestion(
      currentQuestion !== constants.FIRST_QUESTION
        ? currentQuestion - 1
        : questions.length
    );
  };

  const handleNext = () => {
    setCurrentQuestion(
      currentQuestion === questions.length
        ? constants.FIRST_QUESTION
        : currentQuestion + 1
    );
  };

  const NavigationController = () => {
    return (
      <div className="quiz__nav-btn-container">
        {/* <SidebarToggleButton /> */}
        <div className="quiz__navigation-buttons" onClick={handleBack}>
          Back
        </div>
        <div className="quiz__navigation-buttons" onClick={handleNext}>
          Next
        </div>
      </div>
    );
  };

  const Option = ({ option, index }) => {
    return (
      <div
        className="option"
        onClick={() => handleOptionSelect(index, option)}
        style={{
          borderColor:
            questions[currentQuestion - 1].selected === index
              ? brightGreen
              : "gray",
        }}
      >
        {option}
      </div>
    );
  };

  const Question = () => {
    return (
      <>
        <span className="question-current-label">{currentQuestion}</span> /{" "}
        {(questions && questions.length) || 10}){"  "}
        <span className="question">
          {" "}
          {questions.length && questions[currentQuestion - 1].question}{" "}
        </span>
      </>
    );
  };

  const handleQuestionIndicator = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const QuestionsIndicator = ({ index, question }) => {
    return (
      <div
        style={{
          backgroundColor:
            question.selected || question.selected === 0
              ? brightGreen
              : primaryBackgroundColor,
          border: currentQuestion - 1 === index ? `2px solid white` : "none",
          margin: currentQuestion - 1 === index ? "8px" : "10px",
        }}
        className="question-indicator"
        onClick={() => handleQuestionIndicator(index + 1)}
      >
        {index + 1}
      </div>
    );
  };

  const [displayQuitModal, setDisplayQuitModal] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: sidebarBackgroundColor,
      opacity: 0.9,
    },
  };

  function openQuitQuizModal() {
    setDisplayQuitModal(true);
  }

  function closeQuitQuizModal() {
    setDisplayQuitModal(false);
  }

  function quitTest() {
    navigate("/");
  }

  const QuitModal = () => {
    return (
      <Modal
        isOpen={displayQuitModal}
        onRequestClose={closeQuitQuizModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="quit__modal-container">
          <div className="quit__modal-body">
            Are you sure you want to quit ? All your progress will be lost.
          </div>
          <div className="quit__modal-actions">
            <div
              className="quit__modal-action-btn quit__modal-action-btn-no"
              onClick={closeQuitQuizModal}
            >
              No
            </div>
            <div
              className="quit__modal-action-btn quit__modal-action-btn-yes"
              onClick={quitTest}
            >
              Yes
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const [submitQuizModal, setSubmitQuizModal] = useState(false);

  function openSubmitQuizModal() {
    setSubmitQuizModal(true);
  }

  function closeSubmitQuizModal() {
    setSubmitQuizModal(false);
  }

  const SubmitQuizModal = () => {
    return (
      <Modal
        isOpen={submitQuizModal}
        onRequestClose={closeSubmitQuizModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="quit__modal-container">
          <div className="quit__modal-body">
            Are you sure you want to submit ?
          </div>
          <div className="quit__modal-actions">
            <div
              className="quit__modal-action-btn quit__modal-action-btn-no"
              onClick={closeSubmitQuizModal}
            >
              No
            </div>
            <div
              className="quit__modal-action-btn quit__modal-action-btn-yes"
              onClick={handleSubmit}
              style={{
                pointerEvents: submitLoader ? "none" : "all",
              }}
            >
              {submitLoader ? <Loader /> : "Yes"}
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const keepRequiredKeysOnly = (array, keys_to_keep) =>
    array.map((o) =>
      keys_to_keep.reduce((acc, curr) => {
        acc[curr] = o[curr];
        return acc;
      }, {})
    );

  async function handleSubmit() {
    setSubmitLoader(true);
    let responseArray = keepRequiredKeysOnly(questions, ["_id", "answer"]);
    let payload = {
      quizId: currentQuiz.quizId,
      response: responseArray,
      name: (userDetails && userDetails.name) || "Genius",
    };
    const response = await submitUserRecord(payload);
    setSubmitLoader(false);
    if (response && response.data) {
      const storePayload = {
        secured: response.data.secured,
        total: response.data.total,
      };
      dispatch(QuizActions.updateQuizScore(storePayload));
      navigate("/results");
      closeSubmitQuizModal();
    }
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <div className="quiz-page-container">
      <Header />
      {questions.length ? (
        <div className="quiz-canvas">
          <div className="quiz__canvas-left">
            <div className="question-container">
              {questions.length && <Question />}
            </div>
            {questions.length &&
              questions[currentQuestion - 1].options.map((option, index) => {
                return <Option option={option} index={index} />;
              })}
            <NavigationController />
          </div>
          <div className={sidebarClass}>
            <div className="question__indicator-container">
              {questions.map((question, index) => {
                return <QuestionsIndicator index={index} question={question} />;
              })}
            </div>
            <div>
              <div className="quiz__submit-btn" onClick={openSubmitQuizModal}>
                Submit
              </div>
              <div className="quiz__exit-btn" onClick={openQuitQuizModal}>
                Quit
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="questions__loader">
          <Loader />
          <p className="trivia__text">
            <div className="text__label"> Did you know </div>
            {constants.FACTS_LIST[getRandomNumber(0, 9)]}
          </p>
        </div>
      )}
      <QuitModal />
      <SubmitQuizModal />
    </div>
  );
}
