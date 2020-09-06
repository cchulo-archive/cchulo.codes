import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientWindowService } from 'src/app/core/services/client-window.service';
import { Unsubscribable } from 'rxjs';
import { EWindow } from './core/shared/common';

interface ILink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  links: Array<ILink> = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Resume', path: '/resume' }
  ]

  private _clientWindowSub: Unsubscribable;
  
  mobileSize = false;

  constructor(private clientWindowService: ClientWindowService) { }

  ngOnInit(): void {
    this._clientWindowSub = this.clientWindowService.windowResizeEvent
    .subscribe(state => {
      if (state <= EWindow.sm) {
        this.mobileSize = true;
      } else {
        this.mobileSize = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this._clientWindowSub) {
      this._clientWindowSub.unsubscribe();
    }
  }
}
