import { render, fireEvent } from "@testing-library/react";
import LoginPage from "./LoginPage";
import "@testing-library/jest-dom";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { receiveUsers } from "../actions/users";

describe("LoginPage", () => {
  it("is expected to render the component", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it("Is expected to show an error message if a wrong password is typed in the password input field.", async () => {
    const users = {
      mtsamis: {
        id: 'mtsamis',
        password:'xyz123',
        name: 'Mike Tsamis',
        avatarURL: "https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600w-2107967969.jpg",
      }
    }
    await store.dispatch(receiveUsers(users));
    const component = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    const unameInput = component.getByTestId("uname-input");
    fireEvent.change(unameInput, { target: { value: "mtsamis" } });
    const passInput = component.getByTestId("pass-input");
    fireEvent.change(passInput, { target: { value: "notpassword" } });
    const submitButton = component.getByTestId("submit-btn");
    fireEvent.click(submitButton);
    expect(component.getByTestId("message").innerHTML).toBe("Username or Password incorrect!");
    expect(component.queryByTestId("submit-btn")).toBeInTheDocument();
  });

  it("It is expected to show log out button if a user is logged in.", async () => {
    const user = "mtsamis";
    await store.dispatch(setAuthedUser(user));
    const component = render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );
    expect(component.queryByTestId("logout-btn")).toBeInTheDocument();
  });
});
