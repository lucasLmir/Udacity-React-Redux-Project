import { connect } from "react-redux";
import VotersAvatar from "./VotersAvatar";
import { handleAnswerQuestion } from "../actions/questions";

const Question = (props) => {
  const { name, avatar, optionOne, optionTwo } = props.question;
  const { id, authedUser, dispatch } = props;

  const handleVote = (e) => {
    e.preventDefault();

    dispatch(
      handleAnswerQuestion({
        authedUser,
        qid: id,
        answer: e.target.value,
      })
    );
  };

  if (props.question === null) {
    return <p>Question not found</p>;
  }

  const total = optionOne.votes.length + optionTwo.votes.length;

  return (
    <div className="question">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <p>{name}</p>
      <div>
        <div className="question-info">
          <p>Do you rather:</p>
          <button
            disabled={props.isAnswered}
            value="optionOne"
            className="btn"
            onClick={handleVote}
          >
            {optionOne.text}
          </button>
          <progress value={optionOne.votes.length} max={total}></progress>
          <VotersAvatar voters={optionOne.votes} />
        </div>
        <div className="question-info">
          <p>Or:</p>
          <button
            disabled={props.isAnswered}
            value="optionTwo"
            className="btn"
            onClick={handleVote}
          >
            {optionTwo.text}
          </button>
          <progress value={optionTwo.votes.length} max={total}></progress>
          <VotersAvatar voters={optionTwo.votes} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  const { optionOne, optionTwo, timestamp } = question;
  const { name, avatarURL } = users[question.author];

  return {
    authedUser,
    question: question
      ? {
          id,
          timestamp,
          name,
          avatar: avatarURL,
          optionOne: {
            votes: optionOne.votes,
            text: optionOne.text,
          },
          optionTwo: {
            votes: optionTwo.votes,
            text: optionTwo.text,
          },
        }
      : null,
  };
};

export default connect(mapStateToProps)(Question);
