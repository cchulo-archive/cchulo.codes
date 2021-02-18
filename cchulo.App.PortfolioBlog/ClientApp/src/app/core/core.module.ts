import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ToStringPipe } from './pipes/to-string.pipe';


@NgModule({
  declarations: [ToStringPipe],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    AngularMaterialModule,
    ToStringPipe
  ]
})
export class CoreModule { }
