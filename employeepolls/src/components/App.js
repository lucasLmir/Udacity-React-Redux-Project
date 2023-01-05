import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import Nav from "./Nav";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Fragment>
      <div className="container">
        <Nav />
        <Routes>
            <Route path="/" exact element={<Dashboard />} />
          </Routes>
      </div>
    </Fragment>
  );
}

export default App;
