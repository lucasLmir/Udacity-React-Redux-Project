import { render } from "@testing-library/react";
import Nav from "./Nav";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { receiveUsers } from "../actions/users";

describe("Nav", () => {
  it("is expected to render the Nav component", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
  it("The user name and avatar image in the Navbar, it is not expected when no user is logged in.", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );

    expect(component.getByTestId("userName").innerHTML).toBe("Login");
    expect(component.queryByTestId("avatarImg")).not.toBeVisible();
  });
  it("The name of the user and avatar image should appear in the Navbar when the user is authorized.", async () => {
    const users = {
      mtsamis: {
        id: 'mtsamis',
        name: 'Mike Tsamis',
        avatarURL: "https://www.shutterstock.com/image-vector/young-smiling-man-adam-avatar-600w-2107967969.jpg",
      },
    }
    await store.dispatch(receiveUsers(users));
    await store.dispatch(setAuthedUser("mtsamis"));
    const component = render(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );

    expect(component.getByTestId("userName").innerHTML).toBe("Mike Tsamis");
    expect(component.queryByTestId("avatarImg")).toBeVisible();
  });
});
