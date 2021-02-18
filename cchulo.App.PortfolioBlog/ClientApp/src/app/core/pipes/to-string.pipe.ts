import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toString'
})
export class ToStringPipe implements PipeTransform {

  transform(value: any, trigger: any): string {
    const str = value.toString();
    console.log(value, str);
    return str;
  }

}
