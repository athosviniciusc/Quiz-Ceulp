import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import {IMaskModule} from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [QuizFormComponent, QuizListComponent],
  imports: [
    SharedModule,
    QuizRoutingModule,
    IMaskModule,
    CalendarModule
  ]
})
export class QuizModule { }
