export interface SignInUser {
  email: string;
  password: string;
}

export type SignUpUser = SignInUser;

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserQuery {
  user: User;
  isLoading: boolean;
  isFetching: boolean;
}
