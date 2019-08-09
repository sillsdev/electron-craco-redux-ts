// src/store/tree/reducers.ts

import * as types from "./types";

const env = process.env.REACT_APP_MODE + "";

export const treeCleanStore: types.TreeState = {
  availableFiles: [],
  sourceMedia: [],
  annotMedia: [],
  env: env,
  folderName: "",
  path: "",
  loaded: false,
  prevPath: "",
};

export function treeReducer(
  state = treeCleanStore,
  action: types.TreeActionTypes
): types.TreeState {
  switch (action.type) {
    case types.UPDATE_TREE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
