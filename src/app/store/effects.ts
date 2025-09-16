import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GithubService } from "../services/github.service";
import { fetchGithubUser, fetchGithubUserFailure, fetchGithubUserSuccess, followUnfollowUser, changeFollowing, checkFollowing, errorFollowing } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { toast } from "ngx-sonner";

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
          catchError(() => of(fetchGithubUserFailure({ error: 'failed to fetch user details' })))
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
          map(() => changeFollowing({ following: follow })),
          catchError(() => of(errorFollowing({ error: `Failed to ${follow ? 'follow' : 'unfollow'} ${username}` })))
        )
      ))
    )
  })

  checkIfFollowingUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkFollowing),
      switchMap(({ username }) => (
        this.service.checkIfFollowingUser(username).pipe(
          map(() => changeFollowing({ following: true })),
          catchError((err: HttpErrorResponse) => {
            if (err.status == 404)
              return of(changeFollowing({ following: false }))
            else
              return of(errorFollowing({ error: "Failed to fetch 'following' status" }))
          })
        )
      ))
    )
  })
}

@Injectable()
export class ErrorEffects {
  actions$ = inject(Actions)
  displayError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(errorFollowing, fetchGithubUserFailure),
      map((errorObj) => toast.error(errorObj.error))
    )
  }, { dispatch: false })
}