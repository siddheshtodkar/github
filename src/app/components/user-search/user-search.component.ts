import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fetchGithubUser } from '../../store/actions';
import { fetchGithubUserErrorSelector, fetchGithubUserLoadingSelector, fetchGithubUserSelector } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { RecentSearchesComponent } from '../recent-searches/recent-searches.component';

@Component({
  selector: 'app-user-search',
  imports: [FormsModule, AsyncPipe, UserCardComponent, RecentSearchesComponent],
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
  constructor() {
    this.loading$.subscribe(loader => {
      if (loader)
        this.ngxUiLoaderService.start();
      else
        this.ngxUiLoaderService.stop();
    })
  }
  handleSubmit() {
    this.store.dispatch(fetchGithubUser({ username: this.username() }))
  }
}