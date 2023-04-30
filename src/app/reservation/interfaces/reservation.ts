export interface Reservation {
  id?: number;
  stardate: string;
  enddate: string;
  model: string;
  customer: number;
  moto: number;
  status: boolean;
  reservationdate: string
}
