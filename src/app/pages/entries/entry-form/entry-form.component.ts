import { Component, Injector, OnInit} from '@angular/core';
import { Validators } from '@angular/forms';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';



@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  categories: Array<Category>;

  imaskConfig ={
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  ptBR ={
    firstDayOfWeek: 0,
    monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
    'Jul','Ago','Set','Out','Nov','Dez'],
    dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
    dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    protected injector: Injector,
    protected entrieService: EntryService,
    protected categorieService: CategoryService
  ) {
    super(injector, new Entry(), entrieService, Entry.fromJson)
    }

  ngOnInit(){
    this.loadCategories();
    super.ngOnInit();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

    get typeOptions(): Array<any>{
      return Object.entries(Entry.types).map(
        ([value, text]) => {
          return {
            value: value,
            text: text
          }
        }
      )
    }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      types: ["expense",[Validators.required]],
      amount: [null,[Validators.required]],
      date: [null,[Validators.required]],
      paid: [true,[Validators.required]],
      categoryId: [null,[Validators.required]],

    });
  }

  protected loadCategories(){
    this.entrieService.getAll().subscribe (
      categories => this.categories = categories
    );
  }

  protected creationPageTitle(): string{
    return "Cadastro de uma novo lançamento"
  }

  protected editionPageTitle(): string{
    const resouceName = this.resource.name || "";
    return "Editando lançamento: " + resouceName;
  }




}
