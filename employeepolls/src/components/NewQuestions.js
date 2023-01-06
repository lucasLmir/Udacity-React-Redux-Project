import { connect } from "react-redux";
import Question from "./Question";

const NewQuestions = (props) => {

  return (
    <div>
      <h3>New Qusetions</h3>
      <ul className="dashboard-list">
        {props.questionIds.map((id) => (
          <li key={id}>
            <Question id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questionIds: Object.keys(questions)
    .filter(
      (q) =>
        !questions[q].optionOne.votes.includes(authedUser) &&
        !questions[q].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
});

export default connect(mapStateToProps)(NewQuestions);
