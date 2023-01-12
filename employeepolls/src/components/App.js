import { Route, Routes } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";
import NewQeustion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import LoginPage from "./LoginPage";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound";
import ProtectedRoutes from "./ProtectedRoutes";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      {props.loading === true ? null : (
        <div className="container">
          <Nav />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/add" element={<NewQeustion />} />
              <Route path="/question/:id" element={<QuestionPage />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      )}
    </Fragment>
  );
}

const mapStateToProps = ({ users }) => ({
  loading: users === null,
});

export default connect(mapStateToProps)(App);
