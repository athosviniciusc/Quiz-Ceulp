import { Component, OnInit } from '@angular/core';
import {BaseResourceListComponent} from '../../../shared/components/base-resource-list/base-resource-list.component';
import {QuizService} from '../shared/quiz.service';
import {Quiz} from '../shared/quiz.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent extends BaseResourceListComponent<Quiz> {

  constructor(protected QuizService: QuizService) {
    super(QuizService);
  }
}
