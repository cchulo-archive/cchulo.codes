import { BrowserModule } from '@angular/platform-browser';
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
import { faLinkedin, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';


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
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private _library: FaIconLibrary) {
    _library.addIcons(
      faLinkedin,
      faInstagram,
      faGithub
    );
  }

}
