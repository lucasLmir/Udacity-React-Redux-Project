import { connect } from "react-redux";

const Question = (props) => {

  return <div className="question"></div>;
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  const { optionOne, optionTwo, timestamp } = question
  const { name, avatarURL} = users[question.author]

  return {
    authedUser,
    question: {
      id,
      timestamp,
      name,
      avatar: avatarURL,
      optionOne: {
        votes: optionOne.votes.length,
        text: optionOne.text,
      },
      optionTwo: {
        votes: optionTwo.votes.length,
        text: optionTwo.text,
      },
    },
  };
};

export default connect(mapStateToProps)(Question);
