import { createReducer, on } from "@ngrx/store";
import { GithubUserState } from "../types";
import { fetchGithubUser, fetchGithubUserFailure, fetchGithubUserSuccess } from "./actions";

const initialState: GithubUserState = {
  loading: false,
  error: null,
  userDetails: null
}
export const GithubReducer = createReducer(
  initialState,
  on(fetchGithubUser, (state: GithubUserState, { username }) => ({ ...state, loading: true })),
  on(fetchGithubUserSuccess, (state: GithubUserState, { userDetails }) => ({ ...state, userDetails: userDetails, loading: false })),
  on(fetchGithubUserFailure, (state: GithubUserState, { error }) => ({ ...state, error: error, loading: false }))
)