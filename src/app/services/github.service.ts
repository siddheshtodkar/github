import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { GithubUser } from '../types';
const API_URL = "https://api.github.com"
const API_TOKEN = ""

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private http = inject(HttpClient)
  constructor() { }
  fetchGithubUser(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`${API_URL}/users/${username}`)
  }

  fetchGithubUserSuggestions(username: string): Observable<string[]> {
    return this.http.get<string[]>(`${API_URL}/search/users?q=${username}`)
  }

  checkIfFollowingUser(username: string) {
    return this.http.get<string[]>(`${API_URL}/user/following/${username}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: 'application/vnd.github+json'
      },
      observe: 'response'
    })
  }

  followUnfollowUser(username: string, follow: boolean) {
    const url = `${API_URL}/user/following/${username}`
    const headers = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: 'application/vnd.github+json'
      }
    }
    if (follow)
      return this.http.put(url, null, headers)
    else
      return this.http.delete(url, headers)
  }
}