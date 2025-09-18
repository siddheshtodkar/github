import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop'
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fetchGithubUser, getSuggestions } from '../../store/actions';
import { fetchGithubUserErrorSelector, fetchGithubUserLoadingSelector, fetchGithubUserSelector } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { RecentSearchesComponent } from '../recent-searches/recent-searches.component';
import { SuggestionsComponent } from '../suggestions/suggestions.component';

@Component({
  selector: 'app-user-search',
  imports: [FormsModule, AsyncPipe, UserCardComponent, RecentSearchesComponent, SuggestionsComponent],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {
  store = inject(Store)
  ngxUiLoaderService = inject(NgxUiLoaderService)
  username = signal('')
  loading$ = this.store.select(fetchGithubUserLoadingSelector)
  error$ = this.store.select(fetchGithubUserErrorSelector)
  userDetails$ = this.store.select(fetchGithubUserSelector)
  username$ = toObservable(this.username)
  constructor() {
    this.loading$.subscribe(loader => {
      if (loader)
        this.ngxUiLoaderService.start();
      else
        this.ngxUiLoaderService.stop();
    })
    this.username$.subscribe(name =>
      this.store.dispatch(getSuggestions({ user: this.username() }))
    )
  }
  handleSubmit() {
    this.store.dispatch(fetchGithubUser({ username: this.username() }))
  }
}