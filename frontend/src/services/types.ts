export type APIResponse<T> = {
  success: boolean;
  content: T;
};

export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
};

export type InputCreateUser = {
  email: string;
  password: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type InputUpdateSchool = {
  id: number;
  description: string;
};
export interface Link {
  id: string;
  name?: string;
  url?: string;
}

export interface UserDetails {
  isAuthenticated: boolean;
  firstName: string;
  lastName: string;
  email?: string;
  profilePicture?: File | undefined;
}
export interface UserDetailsResponse {
  ID: string;
  firstName: string;
  lastName: string;
  publicEmail?: string;
  profilePicture?: File | undefined;
}
