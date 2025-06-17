export type APIResponse<T> = {
  success: boolean;
  content: T;
  status?: number;
};

export interface Link {
  id: string;
  name?: string;
  url?: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email?: string;
  profilePicture?: File | undefined;
}
