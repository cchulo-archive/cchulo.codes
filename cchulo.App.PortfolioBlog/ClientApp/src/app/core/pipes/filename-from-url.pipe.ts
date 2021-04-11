import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash-es';

@Pipe({
  name: 'filenameFromUrl'
})
export class FilenameFromUrlPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }

    return _.last(value.split('/'));
  }

}
