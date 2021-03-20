import { Pipe, PipeTransform } from '@angular/core';
import { Article } from 'src/models/article';
import * as _ from 'lodash-es';

@Pipe({
  name: 'blogFilter'
})
export class BlogFilterPipe implements PipeTransform {

  transform(articles: Array<Article>, filter: {[tagName: string]: boolean}, refresh: {}): Array<Article> {
    if (!filter) {
      return articles;
    }
    
    const keys = _.keys(filter);
    
    if (keys.length === 0 || _.every(keys, key => filter[key] === false)) {
      return articles;
    }

    const filtered = _.filter(
      articles, article => _.some(
        article.tags, tag => !!filter[tag.name]));

    return filtered;
  }

}
