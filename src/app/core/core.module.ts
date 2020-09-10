import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataBase } from '../in-memory-database';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataBase),
    RouterModule,
  ],
  declarations: [NavbarComponent, NavbarComponent],
  exports:[
    //shared modules - Modulos compartilhados
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    //shared components
    NavbarComponent
  ],

})
export class CoreModule { }
