import { FollowingState, GithubUserState } from "../types";

export interface AppState {
  userDetails: GithubUserState,
  followingState: FollowingState,
  recentSearches: string[]
}