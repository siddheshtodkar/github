export type GithubUser = {
  login: string,
  name: string,
  avatar_url: string,
  html_url: string,
  bio: string
}

export type GithubUserState = {
  userDetails: GithubUser | null,
  loading: boolean,
  error: string | null
}

export type FollowingState = {
  following: boolean,
  loading: boolean,
  error: string | null
}