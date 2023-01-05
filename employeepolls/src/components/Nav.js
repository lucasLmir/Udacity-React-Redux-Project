import { Link } from "react-router-dom";

const Nav = () => (
  <nav className="nav">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;