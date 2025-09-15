import { Component, inject, input, signal } from '@angular/core';
import { GithubUser } from '../../types';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { checkFollowing, followUnfollowUser } from '../../store/actions';
import { errorFollowingUserSelector, followingUserLoadingSelector, followingUserSelector } from '../../store/selectors';

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
  isError$ = this.store.select(errorFollowingUserSelector)
  isFollowing: boolean = false
  constructor() {
    this.isFollowing$.subscribe(isFollowing => this.isFollowing = isFollowing)
  }
  followUnfollowUser() {
    this.store.dispatch(followUnfollowUser({ username: this.user().login, follow: !this.isFollowing }))
  }
  ngOnChanges() {
    this.store.dispatch(checkFollowing({ username: this.user().login }))
  }
}