import { Pipe, PipeTransform } from '@angular/core';
import { Moto } from '../interfaces/moto';

@Pipe({
  name: 'motoFilter',
  standalone: true
})
export class MotoFilterPipe implements PipeTransform {

  transform(motos: Moto[], search: string): Moto[] {

    return search ? motos.filter(r => r.brand.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : motos;
  }

}
