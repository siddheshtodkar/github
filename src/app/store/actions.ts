import { createAction, props } from "@ngrx/store";
import { GithubUser } from "../types";
import { Observable } from "rxjs";

export const fetchGithubUser = createAction('[user page] fetch user', props<{ username: string }>())
export const fetchGithubUserSuccess = createAction('[user page] fetch user success', props<{ userDetails: GithubUser }>())
export const fetchGithubUserFailure = createAction('[user page] fetch user failure', props<{ error: string }>())

export const followUnfollowUser = createAction('[user card page] follow unfollow user', props<{ username: string, follow: boolean }>())
export const followUnfollowUserSuccess = createAction('[user card page] follow unfollow user success', props<{ following: boolean }>())