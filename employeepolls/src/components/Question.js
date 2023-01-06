import { connect } from "react-redux";
import VotersAvatar from "./VotersAvatar";

const Question = (props) => {
  const handleVote = (e) => {
    e.preventDefault();
  };
  if (props.question === null) {
    return <p>Question not found</p>;
  }

  const { name, avatar, optionOne, optionTwo } = props.question;

  const total = optionOne.votes.length + optionTwo.votes.length;

  return (
    <div className="question">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <p>{name}</p>
      <div>
        <div className="question-info">
          <p>Do you rather:</p>
          <button className="btn" onClick={handleVote}>
            {optionOne.text}
          </button>
          <progress value={optionOne.votes.length} max={total}></progress>
          <VotersAvatar voters={optionOne.votes} />
        </div>
        <div className="question-info">
          <p>Or:</p>
          <button className="btn" onClick={handleVote}>
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
