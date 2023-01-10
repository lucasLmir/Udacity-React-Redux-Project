import { connect } from "react-redux";

const LeaderBoard = (props) => {
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
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users).sort(
    (a, b) =>
      Object.keys(b.answers).length +
      Object.keys(b.questions).length -
      (Object.keys(a.answers).length + Object.keys(a.questions).length)
  ),
});

export default connect(mapStateToProps)(LeaderBoard);
