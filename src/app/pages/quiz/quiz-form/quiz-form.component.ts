import {Component, Injector, OnInit} from '@angular/core';
import {BaseResourceFormComponent} from '../../../shared/components/base-resource-form/base-resource-form.component';
import {Category} from '../../categories/shared/category.model';
import {CategoryService} from '../../categories/shared/category.service';
import {Validators} from '@angular/forms';
import {Quiz} from '../shared/quiz.model';
import {QuizService} from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent extends BaseResourceFormComponent<Quiz> implements OnInit {

  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  ptBR = {
    firstDayOfWeek: 0,
    monthNames: ['Janeiro', 'Fevereiro', 'Mar&ccedil;o', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda-feira', 'Ter&ccedil;a-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    protected injector: Injector,
    protected quizService: QuizService,
    protected categorieService: CategoryService
  ) {
    super(injector, new Quiz(), quizService, Quiz.fromJson);
  }

  ngOnInit(){
    this.loadCategories();
    super.ngOnInit();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentChecked() {
    this.setPageTitle();
  }

  get typeOptions(): Array<any>{
    return Object.entries(Quiz.types).map(
      ([value, text]) => {
        return {
          value,
          text
        };
      }
    );
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      title: [null, [Validators.required, Validators.minLength(2)]],
      theme: [null, [Validators.required]],
      techinical: [null, [Validators.required]],
      afiliation: [null],
      date: [null, [Validators.required]],
      local: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],

    });
  }

  protected loadCategories(){
    this.quizService.getAll().subscribe (
      categories => this.categories = categories
    );
  }

  protected creationPageTitle(): string{
    return 'Cadastro de uma novo lançamento';
  }

  protected editionPageTitle(): string{
    const resouceName = this.resource.title || '';
    return 'Editando lançamento: ' + resouceName;
  }




}
