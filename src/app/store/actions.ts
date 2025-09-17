import { createAction, props } from "@ngrx/store";
import { GithubUser } from "../types";

export const fetchGithubUser = createAction('[user page] fetch user', props<{ username: string }>())
export const fetchGithubUserSuccess = createAction('[user page] fetch user success', props<{ userDetails: GithubUser }>())
export const fetchGithubUserFailure = createAction('[user page] fetch user failure', props<{ error: string }>())

export const followUnfollowUser = createAction('[user card page] follow unfollow user', props<{ username: string, follow: boolean }>())
export const changeFollowing = createAction('[user card page] change following', props<{ following: boolean }>())
export const errorFollowing = createAction('[user card page] error following', props<{ error: string }>())
export const checkFollowing = createAction('[user card page] check following', props<{ username: string }>())

export const setRecentSearches = createAction('[recent searches page] set recent searches', props<{ user: string }>())