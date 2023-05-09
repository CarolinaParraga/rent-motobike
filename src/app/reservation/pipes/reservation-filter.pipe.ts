import { Pipe, PipeTransform } from '@angular/core';
import { Reservation } from '../interfaces/reservation';

@Pipe({
  name: 'reservationPipe',
  standalone: true
})
export class ReservationFilterPipe implements PipeTransform {

  transform(reservations: Reservation[], filterBy: string): Reservation[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filter
      ? reservations.filter(
          (ev) =>
            ev.pickuplocation.toLocaleLowerCase().includes(filter) ||
            ev.returnlocation.toLocaleLowerCase().includes(filter)
        )
      : reservations;
  }

}
