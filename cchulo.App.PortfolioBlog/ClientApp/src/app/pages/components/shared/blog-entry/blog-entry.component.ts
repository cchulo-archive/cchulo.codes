import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/models/article';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.scss']
})
export class BlogEntryComponent implements OnInit {

  @Input() blogEntry: Article;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirect() {
    this.router.navigate(['blog', 'detail']);
  }

}
