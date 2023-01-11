import reducer from "./reducers";
import { createStore } from "redux";
import middleware from "./middleware";

export const store = createStore(reducer, middleware);