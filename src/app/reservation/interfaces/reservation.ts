import { Moto } from "src/app/moto/interfaces/moto";
import { User } from "src/app/user/interfaces/user";

export interface Reservation {
  id?: number;
  startdate: string;
  enddate: string;
  starthour: string;
  endhour: string
  user?: number;
  moto?: number;
  pickuplocation: string;
  returnlocation: string;
  status?: boolean;
}
