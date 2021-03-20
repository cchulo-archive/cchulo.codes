import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { CoreModule } from '../core/core.module';
import { BlogEntryComponent } from './components/shared/blog-entry/blog-entry.component';
import { BlogFilterPipe } from './components/blog/pipes/blog-filter.pipe';
import { BlogDetailComponent } from './components/blog/components/blog-detail/blog-detail.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    BlogComponent,
    BlogEntryComponent,
    BlogFilterPipe,
    BlogDetailComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class PagesModule { }
