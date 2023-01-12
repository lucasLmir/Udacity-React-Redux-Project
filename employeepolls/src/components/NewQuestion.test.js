import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { store } from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import NewQuestion from "./NewQuestion";

describe("NewQuestion", () => {
  it("is expected to button is disabled if just one text area has an input.", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <NewQuestion />
        </Router>
      </Provider>
    );
    const optionOne = component.getByTestId("optionOneTextArea");
    fireEvent.change(optionOne, { target: { value: "Option one text" } });
    const submitButton = component.getByTestId("btn-submit");
    expect(submitButton).toHaveAttribute("disabled");
  });

  it("is expected to button is enabled if both text areas have input.", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <NewQuestion />
        </Router>
      </Provider>
    );

    const optionOne = component.getByTestId("optionOneTextArea");
    fireEvent.change(optionOne, { target: { value: "Option one text" } });
    const optionTwo = component.getByTestId("optionTwoTextArea");
    fireEvent.change(optionTwo, { target: { value: "Option two text" } });
    const submitButton = component.getByTestId("btn-submit");

    expect(submitButton).not.toHaveAttribute("disabled");
  });
});
