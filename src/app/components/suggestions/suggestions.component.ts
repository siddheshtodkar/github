import { Component, inject } from '@angular/core';
import { GithubUser } from '../../types';
import { suggestionsSelector } from '../../store/selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { fetchGithubUser, setSuggestions } from '../../store/actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-suggestions',
  imports: [AsyncPipe],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css'
})
export class SuggestionsComponent {
  store = inject(Store)
  users$: Observable<GithubUser[]> = this.store.select(suggestionsSelector)
  onSelect(user: string) {
    if (user.length > 2) {
      this.store.dispatch(fetchGithubUser({ username: user }))
      this.store.dispatch(setSuggestions({ users: [] }))
    }
  }
}