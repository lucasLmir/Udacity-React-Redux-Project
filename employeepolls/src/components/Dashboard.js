import NewQuestions from "./NewQuestions";
import AnsweredQuestions from "./AnsweredQuestions";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [showing, setShowing] = useState("New Questions");
  const ToggleButtons = (e) => {
    if (showing === "New Questions") {
      setShowing("Answered Questions");
    } else {
      setShowing("New Questions");
    }
  };

  return (
    <div className="center">
      <h1>Dashboard</h1>
      <button
        className="btn"
        onClick={ToggleButtons}
        disabled={showing === "New Questions"}
      >
        New Questions
      </button>
      <button
        className="btn"
        onClick={ToggleButtons}
        disabled={showing === "Answered Questions"}
      >
        Answered Questions
      </button>
      <h3>{showing}</h3>
      {showing === "New Questions" && <NewQuestions />}
      {showing === "Answered Questions" && <AnsweredQuestions />}
    </div>
  );
};

export default Dashboard;
