import { Component } from '@angular/core';
import { IconName } from '@fortawesome/fontawesome-svg-core';

interface IMediaLink {
  url: string;
  faIcon: IconName
}

@Component({
  selector: 'app-link-banner',
  templateUrl: './link-banner.component.html',
  styleUrls: ['./link-banner.component.scss']
})
export class LinkBannerComponent {

  links: Array<IMediaLink> = [
    { url: 'https://www.linkedin.com/in/carlos-chulo-150753b6/', faIcon: 'linkedin' },
    { url: 'https://github.com/cchulo', faIcon: 'github' },
    { url: 'https://www.instagram.com/cchulo.codes/', faIcon: 'instagram' },
  ];
  

}
