import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { todosReducers } from "./reducers/todosReducers";
import { tabReducer } from "./reducers/tabReducer";
import { searchReducer } from "./reducers/searchreducer";

const reducer = combineReducers({
  todos: todosReducers,
  currentTab: tabReducer,
  searchWord: searchReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
