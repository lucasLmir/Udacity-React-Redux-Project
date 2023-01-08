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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          name="Uname"
          id="Uname"
          placeholder="Username"
        />
        <br />
        <input
          type="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          name="Pass"
          id="Pass"
          placeholder="Password"
        />
        <br />
        <button>Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(LoginPage);
