import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/core/services/blog.service';
import { Tag } from 'src/models/tag';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  tags: Array<Tag> = [];

  constructor(private _blogService: BlogService) { }

  async ngOnInit() {
    const articles = await this._blogService.allArticles();

    this.tags = await this._blogService.tags();

    console.log(articles);
    console.log(this.tags);
  }

}
