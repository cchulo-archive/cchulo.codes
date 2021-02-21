import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToLocal'
})
export class UtcToLocalPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    return date.toString();
  }

}
