import { Injectable, Injector} from '@angular/core';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { Observable } from 'rxjs';
import {flatMap, catchError, map} from 'rxjs/operators';
import * as moment from 'moment';
import {Quiz} from './quiz.model';



@Injectable({
  providedIn: 'root',
})
export class QuizService extends BaseResourceService<Quiz>{


  constructor(
    protected injector: Injector,
    private categoryService: CategoryService,
  ) {
    super('api/quiz', injector, Quiz.fromJson);
  }

  create(quiz: Quiz): Observable<Quiz>{
    return this.SetCategoryAndSendToServer(quiz, super.create.bind(this));
  }

  update(quiz: Quiz): Observable<Quiz>{
    return this.SetCategoryAndSendToServer(quiz, super.update.bind(this));
  }

  getByMonthAndYear(month: number, year: number): Observable<Quiz[]>{
    return this.getAll().pipe(
      map( entries => this.filterByMonthAndYear(entries, month, year))
    );
  }

  private SetCategoryAndSendToServer(quiz: Quiz, sendFn: any): Observable<Quiz>{
    return this.categoryService.getById(quiz.categoryId).pipe(
      flatMap(category => {
        quiz.category = category;
        return sendFn(quiz);
      }),
      catchError(this.handleError),
    );
  }


  private filterByMonthAndYear(entries: Quiz[], month: number, year: number ){
    return entries.filter(quiz => {
      const  quizData = moment(quiz.date, 'DD/MM/YYYY');

      const monthMatches = quizData.month() + 1 === month;
      const yearMatches = quizData.year() === year;

      if (monthMatches && yearMatches) { return quiz; }
    });
  }


}
