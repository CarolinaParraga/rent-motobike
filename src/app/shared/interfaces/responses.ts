import { Moto } from "../../moto/interfaces/moto";
import { Reservation } from "../../reservation/interfaces/reservation";

import { User } from "../../user/interfaces/user";
import { UserLogin } from "../../user/interfaces/user";


export interface ResponseMotos {
  data: Moto[];
}

export interface ResponseMoto {
  data: Moto;
}

export interface TokenResponse {
  token: string;
}

export interface UserResponse {
  data: User;
}

export interface UsersResponse {
  data: User[];
}

export interface UserLoginResponse {
  userLogin: UserLogin;
}


export interface ResponseReservations {
  data: Reservation[];
}

export interface ResponseReservation {
  data: Reservation;
}
