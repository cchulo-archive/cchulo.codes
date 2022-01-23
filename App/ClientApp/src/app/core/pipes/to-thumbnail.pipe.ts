import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash-es';

@Pipe({
  name: 'toThumbnail'
})
export class ToThumbnailPipe implements PipeTransform {

  transform(value: string): string {
    const elements = value.split('/');
    elements[elements.length - 1] = 'thumbnail_' + elements[elements.length - 1];
    return _.join(elements, '/');
  }

}
