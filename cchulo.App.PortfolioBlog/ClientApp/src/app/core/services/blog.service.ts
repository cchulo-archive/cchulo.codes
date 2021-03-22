import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogPost } from 'src/models/blog-post';
import { Tag } from 'src/models/tag';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _url = '/api/Blog';

  constructor(private _httpClient: HttpClient) {}

  public async latestBlogPosts() {
    return this._httpClient.get<Array<BlogPost>>(`${this._url}/latest`).toPromise();
  }

  public async allBlogPosts() {
    return this._httpClient.get<Array<BlogPost>>(this._url).toPromise();
  }

  public async tags() {
    return this._httpClient.get<Array<Tag>>(`${this._url}/tags`).toPromise();
  }

  public async fullBlogPost(id: number) {
    return this._httpClient.get<BlogPost>(`${this._url}/full-blog-post/${id}`).toPromise();
  }
}
