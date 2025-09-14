import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GithubService } from "../services/github.service";
import { fetchGithubUser, fetchGithubUserFailure, fetchGithubUserSuccess, followUnfollowUser, followUnfollowUserSuccess } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class GithubEffects {
  actions$ = inject(Actions)
  service = inject(GithubService)

  fetchGithubUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchGithubUser),
      switchMap(({ username }) => (
        this.service.fetchGithubUser(username).pipe(
          map((userDetails) => fetchGithubUserSuccess({ userDetails })),
          catchError((error) => of(fetchGithubUserFailure(error)))
        )
      ))
    )
  })
}

@Injectable()
export class FollowingEffects {
  actions$ = inject(Actions)
  service = inject(GithubService)

  followingGithubUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(followUnfollowUser),
      switchMap(({ username, follow }) => (
        this.service.followUnfollowUser(username, follow).pipe(
          map(() => followUnfollowUserSuccess({ following: true })),
          catchError(() => of(followUnfollowUserSuccess({ following: false })))
        )
      ))
    )
  })
}