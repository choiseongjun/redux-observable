import axios from "axios";
import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { switchMap, map, delay, mergeMap } from "rxjs/operators";
import Axios from "axios-observable";
import { Observable } from "rxjs";
import { Action } from "redux-actions";
import { RootState } from "../../";

export const FETCH_POST_LIST = "post/FETCH_POST_LIST";
export const FETCH_POST_LIST_SUCCESS = "post/FETCH_POST_LIST_SUCCESS";

export const fetchPostList = (userId: number) => ({
  type: FETCH_POST_LIST,
  payload: { userId },
});

export const fetchPostListEpic = (action$: Observable<any>, state$: any) =>
  action$.pipe(
    ofType(FETCH_POST_LIST),
    switchMap((action: any) => {
      const { userId } = action.payload;
      return ajax
        .getJSON(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .pipe(
          map((posts) => ({
            type: FETCH_POST_LIST_SUCCESS,
            payload: { data: posts },
          }))
        );
    })
  );

export default function postReudcer(state = [], action: any) {
  switch (action.type) {
    case FETCH_POST_LIST:
      return { ...state, isLoading: true };
    case FETCH_POST_LIST_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };
    default:
      return state;
  }
}
