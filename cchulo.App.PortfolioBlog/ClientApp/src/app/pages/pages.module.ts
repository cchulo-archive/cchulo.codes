import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { CoreModule } from '../core/core.module';
import { BlogEntryComponent } from './components/shared/blog-entry/blog-entry.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    BlogComponent,
    BlogEntryComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class PagesModule { }
