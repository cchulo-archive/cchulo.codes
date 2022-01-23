import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as _ from 'lodash-es';
import { IMediaLink, LinkService } from 'src/app/core/services/link.service';

@Component({
  selector: 'app-link-banner',
  templateUrl: './link-banner.component.html',
  styleUrls: ['./link-banner.component.scss']
})
export class LinkBannerComponent {

  links: Promise<Array<IMediaLink>>;

  constructor(private _linkService: LinkService) {
    this.links = _linkService.getLinks();
  }
  

}
