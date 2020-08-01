export type UserCreationInput = {
  username: string;
  firstName: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  imageUrl: string;
  githubUsername: string;
  role: string;
 }

export type LoginInput = {
   username: string;
   password: string;
 }

export type UpdateUserInput = {
   data: UserCreationInput;
   id: any;
 }
