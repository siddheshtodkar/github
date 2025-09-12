import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GithubService } from "../services/github.service";
import { fetchGithubUser, fetchGithubUserFailure, fetchGithubUserSuccess } from "./actions";
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