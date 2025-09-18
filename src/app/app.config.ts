import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { FollowingReducer, GithubReducer, recentSearchesReducer, suggestionsReducer } from './store/reducers';
import { ErrorEffects, FollowingEffects, GithubEffects } from './store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      'userDetails': GithubReducer,
      'followingState': FollowingReducer,
      'recentSearches': recentSearchesReducer,
      'suggestions': suggestionsReducer
    }),
    provideEffects(GithubEffects, FollowingEffects, ErrorEffects)
  ]
};