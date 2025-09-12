import { Component, inject } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fetchGithubUser } from '../../store/actions';
import { fetchGithubUserErrorSelector, fetchGithubUserLoadingSelector, fetchGithubUserSelector } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-search',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {
  service = inject(GithubService)
  store = inject(Store)
  username: string = ''
  loading$ = this.store.select(fetchGithubUserLoadingSelector)
  error$ = this.store.select(fetchGithubUserErrorSelector)
  userDetails$ = this.store.select(fetchGithubUserSelector)
  handleSubmit() {
    this.store.dispatch(fetchGithubUser({ username: this.username }))
  }
}