import { applyMiddleware, createStore } from "redux";
// import { userReducer } from "./reducers/user.reducer";
import { userReducer } from "./reducers/user.reducer";
import thunk from "redux-thunk";
// import { api } from "./utilities/api";
import { api } from "../utilities/api";
// import { Toast } from "./utilities/toast";
import { Toast } from "../utilities/toast";
export const store = createStore(
  userReducer,
  applyMiddleware(thunk.withExtraArgument({ api, Toast }))
);
