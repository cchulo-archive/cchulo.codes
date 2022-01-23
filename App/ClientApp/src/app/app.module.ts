import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MarkdownModule } from 'ngx-markdown';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { MatIconRegistry } from '@angular/material/icon';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.production ? 'cchulo.codes' : 'localhost',
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgScrollbarModule,
    CoreModule,
    PagesModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE
    }),
    FontAwesomeModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  private readonly _svgIcons: Array<string> = [
    'angular',
    'postgres',
    'net-core',
    'strapi',
    'logo-styled',
    'logo-styled-gradient'
  ];

  constructor(
    
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer,
    private _faLibrary: FaIconLibrary, 
  ) {
    this.initIcons();

    _faLibrary.addIconPacks(fab);
  }

  private initIcons(): void {
    for (let index = 0; index < this._svgIcons.length; index++) {
      const name = this._svgIcons[index];
      if (!name) { continue; }
      const sanitizedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(`assets/svg-icons/${name}.svg`);
      this._iconRegistry.addSvgIcon(name, sanitizedUrl);
    }
  }

}
