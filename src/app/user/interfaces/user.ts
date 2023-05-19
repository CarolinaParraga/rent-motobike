export interface User {
  id?: number;
  email: string;
  roles?: [];
  password: string;
  name: string;
  phone: number;
  license: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserToken {
  iat: number;
  exp: number;
  roles: []
  username: string;
}
