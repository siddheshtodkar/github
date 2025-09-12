import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubUser } from '../types';
const API_URL = "https://api.github.com"

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private http = inject(HttpClient)
  constructor() { }
  fetchGithubUser(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`${API_URL}/users/${username}`)
  }
}
