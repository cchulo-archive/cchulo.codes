import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from 'src/models/blog-post';

@Component({
  selector: 'app-blog-banner',
  templateUrl: './blog-banner.component.html',
  styleUrls: ['./blog-banner.component.scss']
})
export class BlogBannerComponent {

  @Input() blogPost: BlogPost;

  root = '/api/Blog'

  constructor(private router: Router) { }

  async redirect() {
    await this.router.navigate(['blog', 'post', this.blogPost.id]);
  }
}
