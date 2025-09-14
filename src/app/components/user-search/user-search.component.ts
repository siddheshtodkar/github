import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fetchGithubUser } from '../../store/actions';
import { fetchGithubUserErrorSelector, fetchGithubUserLoadingSelector, fetchGithubUserSelector } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-search',
  imports: [FormsModule, AsyncPipe, UserCardComponent],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {
  store = inject(Store)
  username = signal('')
  loading$ = this.store.select(fetchGithubUserLoadingSelector)
  error$ = this.store.select(fetchGithubUserErrorSelector)
  userDetails$ = this.store.select(fetchGithubUserSelector)
  handleSubmit() {
    this.store.dispatch(fetchGithubUser({ username: this.username() }))
  }
}