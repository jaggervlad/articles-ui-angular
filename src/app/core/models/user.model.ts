export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export type CurrentUser = Omit<User, 'token'>;
