import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Nav = (props) => (
  
  <nav className="nav">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/new">Ask a Question</Link>
      </li>
      <li className="right">
        <Link to="/login">
          <span>{props.name}</span>
        </Link>
      </li>
      <li>
        <Link to="/login">
        <img hidden={props.name === undefined}
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
  const userLogged = authedUser === null;

  return {
    name,
    avatar,
  };
};

export default connect(mapStateToProps)(Nav);
