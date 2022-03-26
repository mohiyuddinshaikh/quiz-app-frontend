import { combineReducers, createStore } from "redux";
import quizReducer from "./reducers/quiz.reducer";

const rootReducer = combineReducers({
  quizReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
