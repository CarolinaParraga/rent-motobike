import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'userPipe',
  standalone: true
})
export class UserFilterPipe implements PipeTransform {

  transform(users: User[], filterBy: string): User[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filter
      ? users.filter(
          (ev) =>
            ev.email.toLocaleLowerCase().includes(filter) ||
            ev.name.toLocaleLowerCase().includes(filter)
        )
      : users;
  }

}
