import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/models/article';

@Component({
  selector: 'app-blog-entry',
  templateUrl: './blog-entry.component.html',
  styleUrls: ['./blog-entry.component.scss']
})
export class BlogEntryComponent implements OnInit {

  @Input() blogEntry: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
