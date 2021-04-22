import { trigger, transition, useAnimation, query, style, stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import * as _ from 'lodash-es';
import { fadeIn, fadeInUp } from 'ng-animate';
import { BlogService } from 'src/app/core/services/blog.service';
import { BlogPost } from 'src/models/blog-post';
import { Tag } from 'src/models/tag';

@Component({
  selector: 'app-blog-contents',
  templateUrl: './blog-contents.component.html',
  styleUrls: ['./blog-contents.component.scss'],
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
export class BlogContentsComponent implements OnInit {

  tags: Array<Tag> = [];
  articles: Array<BlogPost> = [];
  articlesToShow: Array<BlogPost> = [];
  paginatedArticles: Array<BlogPost> = [];
  
  inputControl = new FormControl();

  filterTags: { [name: string]: boolean } = {};

  ready = false;

  filterValue: string;

  pageIndex = 0;
  pageSize = 5;

  constructor(private _blogService: BlogService) { }

  async ngOnInit() {

    try {
      this.tags = await this._blogService.tags();
      
      this.articles = await this._blogService.allBlogPosts();
      this.articlesToShow = _.cloneDeep(this.articles);

      this.ready = true;
    } catch (err) {
      console.error(err);
    }
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterArticles();
  }

  private filterArticles() {
    this.articlesToShow = this.filterArticlesBySelectedTags(this.filterBySearch(this.articles));

    this.paginatedArticles = this.paginateArticles(this.articlesToShow);
  }

  selectTag(name: string) {
    if (!name) { return; }
    if (!this.filterTags[name]) {
      this.filterTags[name] = true;
    } else {
      this.filterTags[name] = !this.filterTags[name];
    }

    this.filterArticles();
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.filterArticles();
  }

  private paginateArticles(input: Array<BlogPost>): Array<BlogPost> {
    if (!input || input.length === 0) {
      return [];
    }

    const result: Array<BlogPost> = [];
    const startIndex = this.pageSize * this.pageIndex;

    for(let index = startIndex; index < startIndex + this.pageSize; index++) {

      if (index >= input.length) { break; }

      result.push(input[index]);
    }

    return result;
    
  }

  private filterArticlesBySelectedTags(input: Array<BlogPost>): Array<BlogPost> {

    // match article with selected tag(s)

    // if only one tag selected, article needs to have at least that one match

    if (!this.filterTags) {
      return input;
    }
    
    const keys = _.keys(this.filterTags);
    
    if (keys.length === 0 || _.every(keys, key => this.filterTags[key] === false)) {
      return input;
    }

    const filtered = _.filter(
      input, article => _.some(
        article.tags, tag => !!this.filterTags[tag.name]));

    return filtered;
  }

  private filterBySearch(input: Array<BlogPost>): Array<BlogPost> {
    if (!this.filterValue) {
      return input;
    }

    return _.filter(input,
      article => article.title
        .toLocaleLowerCase()
        .includes(this.filterValue.toLocaleLowerCase()));
  }

}
