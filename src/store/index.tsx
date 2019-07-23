import { applyMiddleware, combineReducers, createStore } from "redux";
import { playerCleanStore, playerReducer } from "./player/reducers";
import { treeCleanStore, treeReducer } from "./tree/reducers";

import { composeWithDevTools } from "redux-devtools-extension";
import { systemReducer } from "./system/reducers";
import thunkMiddleware from "redux-thunk";

const appReducer = combineReducers({
  system: systemReducer,
  tree: treeReducer,
  player: playerReducer,
});

const allReducers = (state: any, action: any) => {
  if (
    action.type === "ON_NEW_FOLDER" ||
    action.types === "ON_RELOAD_FOLDER" ||
    action.type === "HARD_RESET_APP"
  ) {
    state = {
      ...state,
      tree: treeCleanStore,
      player: playerCleanStore
    };
  }
  return appReducer(state, action);
};

export type AppState = ReturnType<typeof allReducers>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    allReducers,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
export * from "./system/actions";
export * from "./player/actions";
export * from "./tree/actions";
