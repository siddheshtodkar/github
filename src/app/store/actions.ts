import { createAction, props } from "@ngrx/store";
import { GithubUser } from "../types";

export const fetchGithubUser = createAction('[user page] fetch user', props<{ username: string }>())
export const fetchGithubUserSuccess = createAction('[user page] fetch user success', props<{ userDetails: GithubUser }>())
export const fetchGithubUserFailure = createAction('[user page] fetch user failure', props<{ error: string }>())