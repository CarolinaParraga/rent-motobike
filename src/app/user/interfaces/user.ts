export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone: number;
  license: string;
  role: string;
  me?: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}
