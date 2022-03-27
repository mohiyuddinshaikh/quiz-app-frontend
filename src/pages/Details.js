import { useEffect, useState } from "react";
import BackgroundParticle from "../components/BackgroundParticle";
import Header from "../components/Header";
import "../styles/details.scss";
import * as QuizActions from "../store/actions/quiz.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Details(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentQuiz = useSelector((state) => state.quizReducer.currentQuiz);

  const [name, setName] = useState("");

  useEffect(() => {
    if (!currentQuiz) {
      navigate("/");
    }
  }, [currentQuiz]);

  const onInputChange = (e) => {
    const { value } = e.target;

    const re = /^[A-Za-z]+$/;
    if (value === "" || re.test(value)) {
      setName(value);
    }
  };

  const handleUpdateName = () => {
    dispatch(QuizActions.updateUserDetail({ name }));
    navigate("/quiz");
  };

  return (
    <div className="details__primary-container">
      <BackgroundParticle />
      <Header />
      <div className="details__layout">
        <p>Hi Genius! What do we call you ?</p>
        <div className="capsule">
          <input
            type="text"
            className="details__input"
            placeholder="Enter Name"
            onChange={onInputChange}
            value={name}
          />
          {name ? (
            <div className="cta" onClick={handleUpdateName}>
              Start
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
