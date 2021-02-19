import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './pages/components/home/home.component';
import { AboutComponent } from './pages/components/about/about.component';
import { ILink } from './core/shared/common';
import { ProjectsComponent } from './pages/components/projects/projects.component';
import { ContactComponent } from './pages/components/contact/contact.component';
import { BlogComponent } from './pages/components/blog/blog.component';

class ExtRoute {
  data?: ILink;
}

/**
 * In angular, Routes is a type for Route[],
 * so we create a new type that is the union of the original Route,
 * and new ExtRoute that defines data to be type of ILink
 */
type ExtRoutes = Array<Route | ExtRoute>;

export const routes: ExtRoutes = [
  {
    path: '', component: HomeComponent,
    data: { label: 'Home' }
  },
  {
    path: 'blog', component: BlogComponent,
    data: { label: 'Blog' }
  },
  {
    path: 'projects', component: ProjectsComponent,
    data: { label: 'Projects' }
  },
  {
    path: 'about', component: AboutComponent,
    data: { label: 'About' }
  },
  {
    path: 'contact', component: ContactComponent,
    data: { label: 'Contact' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
