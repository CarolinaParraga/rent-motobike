import { Moto } from "../../moto/interfaces/moto";
import { Reservation } from "../../reservation/interfaces/reservation";

import { User } from "../../user/interfaces/user";
import { UserLogin } from "../../user/interfaces/user";


export interface ResponseMotos {
  motos: Moto[];
}

export interface ResponseMoto {
  moto: Moto;
}

export interface TokenResponse {
  accessToken: string;
}

export interface UserResponse {
  user: User;
}

export interface UsersResponse {
  users: User[];
}

export interface UserLoginResponse {
  userLogin: UserLogin;
}


export interface ResponseReservations {
  reservations: Reservation[];
}

export interface ResponseReservation {
  reservation: Reservation;
}
