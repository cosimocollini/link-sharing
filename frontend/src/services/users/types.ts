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

export type InputUpdateSchool = {
  id: number;
  description: string;
};