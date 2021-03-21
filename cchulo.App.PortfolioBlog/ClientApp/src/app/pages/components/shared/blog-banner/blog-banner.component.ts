import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/models/article';

@Component({
  selector: 'app-blog-banner',
  templateUrl: './blog-banner.component.html',
  styleUrls: ['./blog-banner.component.scss']
})
export class BlogBannerComponent implements OnInit {

  @Input() blogPost: Article;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async redirect() {
    const result = await this.router.navigate(['blog', 'detail']);
    console.log(result);
  }

}
