import { Component, inject, input, signal } from '@angular/core';
import { GithubUser } from '../../types';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { followUnfollowUser } from '../../store/actions';
import { followingUserLoadingSelector, followingUserSelector } from '../../store/selectors';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  user = input<GithubUser>({
    login: '',
    name: '',
    avatar_url: '',
    html_url: '',
    bio: ''
  })
  store = inject(Store)
  isFollowing$ = this.store.select(followingUserSelector)
  isLoading$ = this.store.select(followingUserLoadingSelector)
  followUnfollowUser() {
    this.isFollowing$.subscribe(follow => this.store.dispatch(followUnfollowUser({ username: this.user().login, follow })))
  }
  ngOninit() {

  }
}