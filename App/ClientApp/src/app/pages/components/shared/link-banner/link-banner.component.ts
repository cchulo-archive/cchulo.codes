import { query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { zoomIn } from 'ng-animate';
import { IMediaLink, LinkService } from 'src/app/core/services/link.service';

@Component({
  selector: 'app-link-banner',
  templateUrl: './link-banner.component.html',
  styleUrls: ['./link-banner.component.scss'],
  animations: [
    trigger('fadeInLeft', [
      transition(':enter', [
        query(':enter', [
          style({opacity: 0 }),
          stagger('50ms', [useAnimation(zoomIn)])
        ], { optional: true })
      ])
    ])
  ]
})
export class LinkBannerComponent {

  links: Promise<Array<IMediaLink>> = Promise.resolve([]);

  constructor(linkService: LinkService) {
    this.links = linkService.getLinks();
  }
  

}
