import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getQuizLeaderboard } from "../api/quiz";
import Header from "../components/Header";
import { Loader } from "../components/Loader";
import "../styles/results.scss";
import { FaRegTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../hooks/isMobile";

export default function Results() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const score = useSelector((state) => state.quizReducer.score);
  const quizReducer = useSelector((state) => state.quizReducer);

  const [leaderboard, setLeaderboard] = useState([]); // top 3
  const [completeLeaderboard, setCompleteLeaderboard] = useState([]); // all

  useEffect(() => {
    fetchTop3Results();
  }, [quizReducer]);

  const fetchTop3Results = async () => {
    if (!quizReducer || (quizReducer && !quizReducer.currentQuiz)) {
      navigate("/");
    }
    const response = await getQuizLeaderboard({
      quizId: quizReducer.currentQuiz.quizId,
    });
    if (response && response.data) {
      setLeaderboard(response.data);
    }
  };

  const fetchAllResultsInLeaderboard = async () => {
    const response = await getQuizLeaderboard({
      quizId: quizReducer.currentQuiz.quizId,
      sendAll: true,
    });
    if (response && response.data) {
      setCompleteLeaderboard(response.data);
    }
  };

  const LeaderboardTable = ({ leaderboardArray }) => {
    const TableRow = ({ rank, name, score }) => {
      return (
        <tr>
          <td className="leaderboard__row1">{rank}</td>
          <td>{name}</td>
          <td>{score}</td>
        </tr>
      );
    };

    return (
      <table>
        <tr>
          <th className="leaderboard__row1">Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
        {leaderboardArray.length &&
          leaderboardArray.map((record, index) => (
            <TableRow
              key={index}
              rank={index + 1}
              name={record.name}
              score={record.score}
            />
          ))}
      </table>
    );
  };

  const [viewAll, setViewAll] = useState(false);

  let sidebarClass = viewAll ? "sidebar open" : "sidebar";

  const openSidebar = () => {
    setViewAll((old) => !old);
    fetchAllResultsInLeaderboard();
  };

  const closeSidebar = () => {
    setViewAll(false);
  };

  const LoadingLeaderboard = () => {
    return (
      <div className="result__leaderboard-load">
        <Loader />
        <p className="result__leaderboard-load-text">Loading Leaderboard ...</p>
      </div>
    );
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div
      className="result__primary-container"
      style={{
        pointerEvents: viewAll ? "none" : "all",
      }}
    >
      <Header />
      {viewAll ? <div class="backdrop"></div> : ""}
      <div className="result__container">
        <div className="result__score-header">You Scored</div>
        <div>
          <span
            className="result__score-text-main"
            style={{ color: score && score.secured > 5 ? "lightgreen" : "red" }}
          >
            {(score && score.secured) || 0}
          </span>
          <span className="result__score-text-total">
            {" "}
            / {(score && score.total) || 10}{" "}
          </span>
        </div>
        {leaderboard.length ? (
          <>
            <div className="result__leaderboard-label">Leaderboard</div>
            <LeaderboardTable leaderboardArray={leaderboard} />
          </>
        ) : (
          <LoadingLeaderboard />
        )}
        {leaderboard.length ? (
          <div className="btn__container">
            <div className="result__home-btn" onClick={openSidebar}>
              View All
            </div>
            <div className="result__view-all-btn" onClick={goHome}>
              Home
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        style={{
          pointerEvents: "all",
          width:
            isMobile && viewAll ? "70%" : !isMobile && viewAll ? "30%" : "",
        }}
        className={sidebarClass}
      >
        <div className="sidebar__body">
          <div className="header__strip">
            <FaRegTimesCircle
              onClick={closeSidebar}
              style={{
                fontSize: isMobile ? "25px" : "30px",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="leaderboard__table">
            <div className="result__leaderboard-label">Leaderboard</div>
            {completeLeaderboard.length ? (
              <LeaderboardTable leaderboardArray={completeLeaderboard} />
            ) : (
              <LoadingLeaderboard />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
