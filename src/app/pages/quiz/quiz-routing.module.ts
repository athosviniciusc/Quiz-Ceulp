import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuizFormComponent} from './quiz-form/quiz-form.component';
import {EntryListComponent} from '../entries/entry-list/entry-list.component';
import {EntryFormComponent} from '../entries/entry-form/entry-form.component';
import {QuizListComponent} from './quiz-list/quiz-list.component';


const routes: Routes = [
  { path: '', component: QuizListComponent},
  { path: 'new', component: QuizFormComponent},
  { path: ':id/edit', component: QuizFormComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
  ]
})
export class QuizRoutingModule { }
