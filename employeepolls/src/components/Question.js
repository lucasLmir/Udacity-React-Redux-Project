import { connect } from "react-redux";
import VotersAvatar from "./VotersAvatar";
import { Link } from "react-router-dom";

const Question = (props) => {
  const { name, avatar, optionOne, optionTwo } = props.question;
  const { id } = props;

  if (props.question === null) {
    return <p>Question not found</p>;
  }

  const total = optionOne.votes.length + optionTwo.votes.length;

  return (
    <Link to={`/question/${id}`} className="question" data-testid="question" >
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <p>{name}</p>
      <div>
        <div className="question-info">
          <p>Would you rather:</p>
          <span>{optionOne.text}</span>
          <div hidden={!props.isAnswered}>
            <progress value={optionOne.votes.length} max={total}></progress>
            <VotersAvatar voters={optionOne.votes} />
          </div>
        </div>
        <div className="question-info">
          <p>Or:</p>
          <span>{optionTwo.text}</span>
          <div hidden={!props.isAnswered}>
            <progress value={optionTwo.votes.length} max={total}></progress>
            <VotersAvatar voters={optionTwo.votes} />
          </div>
        </div>
      </div>
    </Link>
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
