import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/core/services/blog.service';
import { Article } from 'src/models/article';
import { Tag } from 'src/models/tag';
import { fadeIn } from 'ng-animate'
import { query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', useAnimation(fadeIn))
    ]),
    trigger('fadeInTags', [
      transition(':enter', [
        query(':enter', [
          style({opacity: 0}),
          stagger('50ms', [useAnimation(fadeIn)])
        ], {optional: true})
      ])
    ])
  ]
})
export class BlogComponent implements OnInit {

  tags: Array<Tag> = [];
  articles: Array<Article> = [];

  ready = false;

  constructor(private _blogService: BlogService) { }

  async ngOnInit() {

    try {
      this.tags = await this._blogService.tags();
      
      this.articles = await this._blogService.allArticles();

      this.ready = true;
    } catch (err) {
      console.error(err);
    }
  }

}
