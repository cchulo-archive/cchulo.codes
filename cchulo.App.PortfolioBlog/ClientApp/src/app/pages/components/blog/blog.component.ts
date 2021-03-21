import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/core/services/blog.service';
import { Article } from 'src/models/article';
import { Tag } from 'src/models/tag';
import { fadeIn, fadeInDown, fadeInUp, fadeOutUp } from 'ng-animate'
import { query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';
import * as _ from 'lodash-es';

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
    ]),
    trigger('fadeInUpBlogs', [
      transition(':enter', [
        query(':enter', [
          style({opacity: 0}),
          stagger('50ms', [useAnimation(fadeInUp)])
        ], {optional: true}),
      ])
    ])
  ]
})
export class BlogComponent {

  

}
