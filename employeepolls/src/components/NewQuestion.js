import { useState } from "react";
import { handleAddQuestion } from "../actions/questions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NewQeustion = ({ authedUser, dispatch, id }) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  useEffect(() => {
    if (authedUser === null) {
      navigate("/login");
    }
  }, []);

  const handleChangeOne = (e) => {
    const text = e.target.value;
    setOptionOne(text);
  };
  const handleChangeTwo = (e) => {
    const text = e.target.value;
    setOptionTwo(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddQuestion(optionOne, optionTwo));

    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  };

  return (
    <div className="center">
      <h1>New Question</h1>
      <form className="new-question" onSubmit={handleSubmit}>
        <textarea
          placeholder="Option one"
          value={optionOne}
          onChange={handleChangeOne}
          className="textarea"
          maxLength={100}
        />
        <textarea
          placeholder="Option two"
          value={optionTwo}
          onChange={handleChangeTwo}
          className="textarea"
          maxLength={100}
        />
        <button className="btn" disabled={optionOne === "" || optionTwo === ""}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser}) => ({
  authedUser,
});

export default connect(mapStateToProps)(NewQeustion);
