import React from "react";
import "../styles/index.scss";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="header">
      <div className="logoText" onClick={goToHome}>
        Trivin
      </div>
    </div>
  );
}
