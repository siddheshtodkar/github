import { createSelector } from "@ngrx/store";
import { AppState } from "./state";

const state = (appState:AppState) => appState.userDetails

export const fetchGithubUserLoadingSelector = createSelector(
  state,
  (state)=>state.loading
)

export const fetchGithubUserErrorSelector = createSelector(
  state,
  (state)=>state.error
)

export const fetchGithubUserSelector = createSelector(
  state,
  (state)=>state.userDetails
)