import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Article } from 'src/models/article';
import { Tag } from 'src/models/tag';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _url = '/api/Blog';

  constructor(private _httpClient: HttpClient) {}

  public async latestArticles() {
    return this._httpClient.get<Array<Article>>(`${this._url}/latest`).toPromise();
  }

  public async allArticles() {
    return this._httpClient.get<Array<Article>>(this._url).toPromise();
  }

  public async tags() {
    return this._httpClient.get<Array<Tag>>(`${this._url}/tags`).toPromise();
  }

  public async fullArticle(id: number) {
    return this._httpClient.get<Article>(`${this._url}/article/${id}}`).toPromise();
  }
}
