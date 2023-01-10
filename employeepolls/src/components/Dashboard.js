import NewQuestions from "./NewQuestions";
import AnsweredQuestions from "./AnsweredQuestions";

const Dashboard = () => {

  return (
    <div className="center">
      <h1>Dashboard</h1>
      <NewQuestions />
      <AnsweredQuestions />
    </div>
  );
};


export default (Dashboard);
