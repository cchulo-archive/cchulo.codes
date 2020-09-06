import { Component } from '@angular/core';

interface ILink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  links: Array<ILink> = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Resume', path: '/resume' }
  ]
}
