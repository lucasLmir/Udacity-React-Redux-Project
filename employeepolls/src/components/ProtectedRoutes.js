import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginPage from "./LoginPage";

const useAuth = (auth) => {
  const user = { loggedIn: auth };
  return user && user.loggedIn;
};

const ProtectedRoutes = (props) => {


  const isAuth = useAuth(props.auth);

  return isAuth ? <Outlet /> : <LoginPage />;
};

const mapStateToProps = ({ authedUser }) => {
  const auth = authedUser !== null;

  return {
    auth,
  };
};

export default connect(mapStateToProps)(ProtectedRoutes);
