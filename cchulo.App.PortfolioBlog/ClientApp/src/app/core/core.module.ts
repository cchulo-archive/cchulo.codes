import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ToStringPipe } from './pipes/to-string.pipe';
import { HttpClientModule } from '@angular/common/http';
import { UtcToLocalPipe } from './pipes/utc-to-local.pipe';
import { FilenameFromUrlPipe } from './pipes/filename-from-url.pipe';


@NgModule({
  declarations: [
    ToStringPipe,
    UtcToLocalPipe,
    FilenameFromUrlPipe
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  exports: [
    AngularMaterialModule,
    ToStringPipe,
    UtcToLocalPipe,
    FilenameFromUrlPipe
  ]
})
export class CoreModule { }
