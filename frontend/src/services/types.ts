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
