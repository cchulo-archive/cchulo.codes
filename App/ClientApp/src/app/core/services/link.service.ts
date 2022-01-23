import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediaLink } from 'src/models/media-link';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import * as _ from 'lodash-es';

export interface IMediaLink {
  url: string;
  faIcon: IconName
}

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private _url = '/api/Links';

  private _links: Array<IMediaLink>;

  constructor(private _httpClient: HttpClient) {}

  public async getLinks() : Promise<Array<IMediaLink>> {
    if (this._links?.length > 0) {
      return this._links;
    }
    const links = await this._httpClient.get<Array<MediaLink>>(this._url).toPromise();
    return this._links = _.map(links, link => {
      return { url: link.url, faIcon: link.faIcon } as IMediaLink
    });
  }
}
