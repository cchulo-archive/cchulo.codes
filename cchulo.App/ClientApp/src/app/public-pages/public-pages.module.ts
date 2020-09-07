import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/**
 * This module will host components that do not need to be lazily loaded since these will be available to the public,
 * and do not contain any sensitive information, or any scripts that will modify contents of the site
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PublicPagesModule { }
