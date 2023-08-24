export interface SignInUserPayload {
  email: string;
  password: string;
}

export type SignUpUserPayload = SignInUserPayload;

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
