import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PagesHeaderComponent } from './components/pages-header/pages-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';
import {NavbarComponent} from '../core/components/navbar/navbar.component';


@NgModule({
  declarations: [BreadCrumbComponent, PagesHeaderComponent, FormFieldErrorComponent, ServerErrorMessagesComponent],
  exports:[
    //shared module
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    //shared components
    BreadCrumbComponent,
    PagesHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,


  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,


  ]
})
export class SharedModule { }
