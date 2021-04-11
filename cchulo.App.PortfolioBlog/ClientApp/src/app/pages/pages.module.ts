import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CoreModule } from '../core/core.module';
import { BlogBannerComponent } from './components/shared/blog-banner/blog-banner.component';
import { BlogDetailComponent } from './components/blog/components/blog-detail/blog-detail.component';
import { BlogContentsComponent } from './components/blog/components/blog-contents/blog-contents.component';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    BlogBannerComponent,
    BlogDetailComponent,
    BlogContentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    FontAwesomeModule,
    MarkdownModule.forChild(),
    NgcCookieConsentModule
  ]
})
export class PagesModule { }
