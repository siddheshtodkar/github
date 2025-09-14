import { createReducer, on } from "@ngrx/store";
import { FollowingState, GithubUserState } from "../types";
import { fetchGithubUser, fetchGithubUserFailure, fetchGithubUserSuccess, followUnfollowUser, followUnfollowUserSuccess } from "./actions";

const initialState: GithubUserState = {
  loading: false,
  error: null,
  userDetails: null
}
export const GithubReducer = createReducer(
  initialState,
  on(fetchGithubUser, (state: GithubUserState, { username }) => ({ ...state, loading: true })),
  on(fetchGithubUserSuccess, (state: GithubUserState, { userDetails }) => ({ ...state, userDetails, loading: false })),
  on(fetchGithubUserFailure, (state: GithubUserState, { error }) => ({ ...state, error: error, loading: false }))
)

const initialFollowingState: FollowingState = {
  loading: false,
  following: false
}
export const FollowingReducer = createReducer(
  initialFollowingState,
  on(followUnfollowUser, (state: FollowingState, { username, follow }) => ({ ...state, loading: true })),
  on(followUnfollowUserSuccess, (state: FollowingState, { following }) => ({ ...state, following, loading: false }))
)