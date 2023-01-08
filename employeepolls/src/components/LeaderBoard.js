import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LeaderBoard = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.authedUser === null) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <h1>Leader Board</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Answereds</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {props?.users.map((u) => (
            <tr key={u.name}>
              <td>{u.name}</td>
              <td>{Object.keys(u.answers).length}</td>
              <td>{u.questions.length}</td>
            </tr>
          ))}
          ;
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => ({
  users: Object.values(users).sort(
    (a, b) =>
      Object.keys(b.answers).length +
      Object.keys(b.questions).length -
      (Object.keys(a.answers).length + Object.keys(a.questions).length)
  ),
  authedUser,
});

export default connect(mapStateToProps)(LeaderBoard);
