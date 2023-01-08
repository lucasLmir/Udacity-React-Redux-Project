import NewQuestions from "./NewQuestions";
import AnsweredQuestions from "./AnsweredQuestions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.authedUser === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="center">
      <h1>Dashboard</h1>
      <NewQuestions />
      <AnsweredQuestions />
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  loading: users === null,
});

export default connect(mapStateToProps)(Dashboard);
