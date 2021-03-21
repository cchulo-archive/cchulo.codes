import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './pages/components/home/home.component';
import { AboutComponent } from './pages/components/about/about.component';
import { ILink } from './core/shared/common';
import { ProjectsComponent } from './pages/components/projects/projects.component';
import { ContactComponent } from './pages/components/contact/contact.component';
import { BlogDetailComponent } from './pages/components/blog/components/blog-detail/blog-detail.component';
import { BlogContentsComponent } from './pages/components/blog/components/blog-contents/blog-contents.component';
import { ERouteLabels } from './core/shared/e-route-labels';

class ExtRoute {
  data?: ILink;
  navServiceSkip?: boolean;
}

/**
 * In angular, Routes is a type for Route[],
 * so we create a new type that is the union of the original Route,
 * and new ExtRoute that defines data to be type of ILink
 */
type ExtRoutes = Array<Route & ExtRoute>;

export const routes: ExtRoutes = [
  {
    path: '', component: HomeComponent,
    data: { label: ERouteLabels.Home.toString() }
  },
  {
    path: 'blog',
    component: BlogContentsComponent,
    data: { label: ERouteLabels.Blogs.toString() }
  },
  {
    path: 'blog/post/:id',
    component: BlogDetailComponent,
    data: { label: ERouteLabels.BlogPost.toString() },
    navServiceSkip: true
  },
  {
    path: 'projects', component: ProjectsComponent,
    data: { label: ERouteLabels.Projects.toString() }
  },
  {
    path: 'about', component: AboutComponent,
    data: { label: ERouteLabels.About.toString() }
  },
  {
    path: 'contact', component: ContactComponent,
    data: { label: ERouteLabels.Contact.toString() }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
