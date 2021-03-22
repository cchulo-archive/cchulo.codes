import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unsubscribable } from 'rxjs';
import { BlogService } from 'src/app/core/services/blog.service';
import { BlogPost } from 'src/models/blog-post';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit, OnDestroy {

  ready = false;

  paramSub: Unsubscribable;

  post: BlogPost;

  constructor(
    private _route: ActivatedRoute,
    private _blogService: BlogService) { }

  ngOnInit(): void {
    this.paramSub = this._route.paramMap.subscribe(async params => {
      const id = params.get('id');
      try {
        this.post = await this._blogService.fullBlogPost(Number.parseInt(id));
        console.log(this.post);
        this.ready = true;
      } catch (err) {
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }

}
