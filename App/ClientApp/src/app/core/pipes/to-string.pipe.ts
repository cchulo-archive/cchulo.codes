import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toString'
})
export class ToStringPipe implements PipeTransform {

  transform(value: any, trigger: any): string {
    return value.toString();
  }

}
