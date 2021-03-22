import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { CoreModule } from '../core/core.module';
import { BlogBannerComponent } from './components/shared/blog-banner/blog-banner.component';
import { BlogDetailComponent } from './components/blog/components/blog-detail/blog-detail.component';
import { BlogContentsComponent } from './components/blog/components/blog-contents/blog-contents.component';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    BlogBannerComponent,
    BlogDetailComponent,
    BlogContentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    MarkdownModule.forChild()
  ]
})
export class PagesModule { }
