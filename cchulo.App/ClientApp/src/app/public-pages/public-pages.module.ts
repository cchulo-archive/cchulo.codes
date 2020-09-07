import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ResumeComponent } from './components/resume/resume.component';


/**
 * This module will host components that do not need to be lazily loaded since these will be available to the public,
 * and do not contain any sensitive information, or any scripts that will modify contents of the site
 */
@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ResumeComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class PublicPagesModule { }
