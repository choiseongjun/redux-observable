import axios from "axios";
import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { switchMap, map, delay, mergeMap } from "rxjs/operators";
import Axios from "axios-observable";
import { Observable,filter ,from} from "rxjs";
import { Action } from "redux-actions";
import { RootState } from "../../";
import { createAsyncAction,isActionOf } from 'typesafe-actions';

export const FETCH_POST_LIST_REQUEST = "post/FETCH_POST_LIST_REQUEST";
export const FETCH_POST_LIST_SUCCESS = "post/FETCH_POST_LIST_SUCCESS";
export const FETCH_POST_LIST_FAILURE = "post/FETCH_POST_LIST_FAILURE";

export const CHANGE_INPUT= "CHANGE_INPUT";

export const fetchPostList = (userId: number) => ({
  type: FETCH_POST_LIST_REQUEST,
  payload: { userId },
});
export const ChangeInput = (text:string)=>({
    type: CHANGE_INPUT,
    payload: { text },
})

export const fetchPostListEpic = (action$: Observable<any>, state$: any) =>

  action$.pipe(
    ofType(FETCH_POST_LIST_REQUEST),
    switchMap((action: any) => {
      const { userId } = action.payload;
      return from(
          axios
              .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        )
        .pipe(
          map((posts) => ({
            type: FETCH_POST_LIST_SUCCESS,
            payload: { posts: posts.data },
          }))
        );
    })
  );

export default function postReudcer(state = [], action: any) {
  switch (action.type) {
    case FETCH_POST_LIST_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_POST_LIST_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };
    case CHANGE_INPUT:
      return {...state,...action.payload}
    default:
      return state;
  }
}
