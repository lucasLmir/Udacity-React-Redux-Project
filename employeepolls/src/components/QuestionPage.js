import { connect } from "react-redux";
import VotersAvatar from "./VotersAvatar";
import { handleAnswerQuestion } from "../actions/questions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const withRouter = (Componet) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Componet {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};



const Question = (props) => {
  //const { name, avatar, optionOne, optionTwo } = props.question;
  const { authedUser, dispatch } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (props.authedUser === null) {
      navigate("/login");
    }
  }, []);

  const handleVote = (e) => {
    e.preventDefault();

    dispatch(
      handleAnswerQuestion({
        authedUser: props.authedUser,
        qid: props.id,
        answer: e.target.value,
      })
    );
  };

  if (props.question === null) {
    return <p>Question not found</p>;
  }

  return (
    <div className="center">
      {props.loading === true ? null : (
        <div>
          <img
            src={props.userAvatar}
            alt={`Avatar of ${props.author}`}
            className="big-avatar"
          />
          <h3>{props.author}</h3>

          <Link to={"/"}>
            <h5>Poll answered, click here to go back</h5>
          </Link>
          <h4>Would You Rather</h4>
          <div className="question">
            <div className="question-info">
              <div className="question-info">
                <p>{props?.question?.optionOne.text}</p>
              </div>
              <div hidden={!props.isAnswered}>
                <progress
                  className="left"
                  value={props?.question?.optionOne.votes.length}
                  max={props.totalVotes}
                ></progress>
                <VotersAvatar voters={props?.question?.optionOne.votes} />
              </div>
              <button
                value="optionOne"
                disabled={props.isAnswered}
                className="btn-vote"
                onClick={handleVote}
              >
                Vote
              </button>
            </div>
          </div>

          <h4>Or</h4>

          <div className="question">
            <div className="question-info">
              <div className="question-info">
                <p>{props?.question?.optionTwo.text}</p>
              </div>
              <div hidden={!props.isAnswered}>
                <progress
                  className="left"
                  value={props?.question?.optionTwo.votes.length}
                  max={props.totalVotes}
                ></progress>
                <VotersAvatar voters={props?.question?.optionTwo.votes} />
              </div>
              <button
                value="optionTwo"
                disabled={props.isAnswered}
                onClick={handleVote}
                className="btn-vote"
              >
                Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const { id } = props.router.params;
  const question = questions[id];
  const userAvatar = users[question?.author]?.avatarURL;
  const author = users[question?.author]?.name;
  const totalVotes = question
    ? question.optionOne.votes.length + question.optionTwo.votes.length
    : 0;
  const isAnswered =
    question?.optionOne.votes.includes(authedUser) ||
    question?.optionTwo.votes.includes(authedUser);

  return {
    id,
    users,
    userAvatar,
    author,
    authedUser,
    question,
    isAnswered,
    totalVotes,
    loading: authedUser === null,
  };
};

export default withRouter(connect(mapStateToProps)(Question));
