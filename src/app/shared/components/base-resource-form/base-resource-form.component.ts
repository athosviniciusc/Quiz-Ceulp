import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import {  FormBuilder,  FormGroup,  Validators,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

import { BaseResourceModel } from "../../models/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";


export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked {
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: String;
  saverErrorMessages: string[] = null;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected JsonDataToResourceFn: (jsonData) => T,

  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setCurrentAction(); //verificar se é edit ou new
    this.buildResourceForm(); //tratamento de form
    this.loadResource(); //carregar categorias
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == 'new') this.createResource();
    /// currentAction será edit
    else this.updateResource();
  }

  ///Methods privates

   protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') this.currentAction = 'new';
    else this.currentAction = 'edit';
  }

  protected loadResource() {
    if (this.currentAction == 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) => this.resourceService.getById(+params.get('id')))
        )
        .subscribe(
          (resource) => {
            this.resource = resource;
            this.resourceForm.patchValue(resource); //binds loaded resource data to resourceForm
          },
          (error) => alert('Ocorreu um erro no servidor, tente mais tarde!')
        );
    }
  }

  protected setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = this.creationPageTitle();
    else {
      this.pageTitle = this.editionPageTitle();
    }
  }
  protected creationPageTitle(): string{
    return "Novo"
  }

  protected editionPageTitle(): string{
    return "Edição"
  }

  protected createResource() {
    const resource: T = this.JsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.create(resource)
    .subscribe(
      resource => this.actionsForSucess(resource),
      error => this.actionsForError(error)
    )
  }

  protected updateResource() {
    const resource: T = this.JsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.update(resource)
    .subscribe(
      resource => this.actionsForSucess(resource),
      error => this.actionsForError(error)
    )
  }


  protected actionsForSucess(resource: T){
    toastr.success("Solicitação processada com sucesso");

    const BaseComponentPath: string = this.route.parent.url[0].path;

    //redirect/reload component page
    this.router.navigateByUrl(BaseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([BaseComponentPath, resource.id, "edit"]))
  }


  protected actionsForError(error){
    toastr.error("Ocorreu um erro ao processar sua solicitação!");
    this.submittingForm = false;

    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.saverErrorMessages =["Falha na comunicação com o servidor. Por favor, tente mais tarde"]
  }

  protected abstract buildResourceForm(): void;

}
