import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchGithubUser } from '../../store/actions';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { recentSearchesSelector } from '../../store/selectors';

@Component({
  selector: 'app-recent-searches',
  imports: [AsyncPipe],
  templateUrl: './recent-searches.component.html',
  styleUrl: './recent-searches.component.css'
})
export class RecentSearchesComponent {
  store = inject(Store)
  users$: Observable<string[]> = this.store.select(recentSearchesSelector)
  onSelect(user: string) {
    this.store.dispatch(fetchGithubUser({ username: user }))
  }
}