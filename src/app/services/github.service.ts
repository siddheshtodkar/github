import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  VITE_GITHUB_API_URL="https://api.github.com"
  constructor() { }
}
