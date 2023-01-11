import { render } from "@testing-library/react";
import App from "./App";
import { store } from "../store";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

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
});
