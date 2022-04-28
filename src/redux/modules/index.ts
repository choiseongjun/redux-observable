import { combineEpics } from "redux-observable";
import { combineReducers } from "redux";
import post, { fetchPostListEpic } from "./post";

export const rootEpic = combineEpics(fetchPostListEpic);
export const rootReducer = combineReducers({ post });
