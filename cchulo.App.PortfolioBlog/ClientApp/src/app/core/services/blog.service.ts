import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from 'src/models/article';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _url = '/api/Blog';

  constructor(private _httpClient: HttpClient) {}

  public async latestArticles() {
    return this._httpClient.get<Array<Article>>(`${this._url}/latest`).toPromise();
  }
}
