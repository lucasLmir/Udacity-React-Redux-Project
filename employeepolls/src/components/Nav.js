import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const Nav = (props) => (
  <nav className="nav">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/add">Ask a Question</Link>
      </li>
      <li>
        <Link to="/leaderboard">Leader Board</Link>
      </li>
      <li className="mid-li"></li>
      <li>
        <Link
          hidden={props.name === undefined}
          onClick={(e) => props.dispatch(setAuthedUser(null))}
        >
          LogOut
        </Link>
      </li>
      <li>
        <Link to="/login">
          <span data-testid="userName">
            {props.name === undefined ? "Login" : props.name}
          </span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <img
            data-testid="avatarImg"
            hidden={props.name === undefined}
            alt={`avatar of ${props.name}`}
            src={props.avatar}
            className="small-avatar"
          />
        </Link>
      </li>
    </ul>
  </nav>
);

const mapStateToProps = ({ authedUser, users }) => {
  const avatar = users[authedUser]?.avatarURL;
  const name = users[authedUser]?.name;

  return {
    name,
    avatar,
  };
};

export default connect(mapStateToProps)(Nav);
