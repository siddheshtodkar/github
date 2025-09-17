import { createSelector } from "@ngrx/store";
import { AppState } from "./state";

const state = (appState: AppState) => appState.userDetails

export const fetchGithubUserLoadingSelector = createSelector(
  state,
  (state) => state.loading
)

export const fetchGithubUserErrorSelector = createSelector(
  state,
  (state) => state.error
)

export const fetchGithubUserSelector = createSelector(
  state,
  (state) => state.userDetails
)

const followingState = (appState: AppState) => appState.followingState

export const followingUserLoadingSelector = createSelector(
  followingState,
  (state) => state.loading
)

export const followingUserSelector = createSelector(
  followingState,
  (state) => state.following
)

export const errorFollowingUserSelector = createSelector(
  followingState,
  (state) => state.error
)

const recentSearchesState = (appState: AppState) => appState.recentSearches

export const recentSearchesSelector = createSelector(
  recentSearchesState,
  (state) => state
)