import { connect } from "react-redux";
import { useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = props.users[uname].password === pass;

    if (match) {
      props.dispatch(setAuthedUser(uname));
      navigate("/");
    } else {
      setMessage("Username or Password incorrect!");
    }
  };

  const handleLogout = (e) => {
    props.dispatch(setAuthedUser(null));
  };

  return (
    <div>
      <button
        data-testid="logout-btn"
        hidden={props.authedUser === null}
        onClick={handleLogout}
      >
        LogOut
      </button>
      <form onSubmit={handleSubmit} data-testid="login-form">
        <input
          data-testid="uname-input"
          type="text"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          name="Uname"
          id="Uname"
          placeholder="Username"
          hidden={props.authedUser !== null}
        />
        <br />
        <input
          data-testid="pass-input"
          type="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          name="Pass"
          id="Pass"
          placeholder="Password"
          hidden={props.authedUser !== null}
        />
        <br />
        <button data-testid="submit-btn" hidden={props.authedUser !== null}>LogIn</button>
      </form>
      <p data-testid="message">{message}</p>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    users,
    authedUser,
  };
};
export default connect(mapStateToProps)(LoginPage);
