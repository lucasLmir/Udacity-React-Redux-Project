import { render } from "@testing-library/react";
import App from "./App";
import { store } from "../store";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

describe("App", () => {
  it("is expected to render the component", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
  it("It is expected to load the Login Page if no authed User is logged.", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    expect(component.getByTestId("login-form")).toBeInTheDocument();
  });

  it("It is expected to give access to the app if a user is logged in.", async () => {
    const user = "mtsamis";
    await store.dispatch(setAuthedUser(user));
    const component = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    expect(component.queryByTestId("login-form")).not.toBeInTheDocument();
  });
});
