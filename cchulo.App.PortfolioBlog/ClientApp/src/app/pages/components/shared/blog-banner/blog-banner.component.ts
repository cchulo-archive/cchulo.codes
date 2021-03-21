import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from 'src/models/blog-post';

@Component({
  selector: 'app-blog-banner',
  templateUrl: './blog-banner.component.html',
  styleUrls: ['./blog-banner.component.scss']
})
export class BlogBannerComponent implements OnInit {

  @Input() blogPost: BlogPost;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.blogPost);
  }

  async redirect() {
    const result = await this.router.navigate(['blog', 'detail']);
    console.log(result);
  }

}
