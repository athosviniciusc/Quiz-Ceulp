import { OnInit } from '@angular/core';
import { BaseResourceModel } from '../../../shared/models/base-resource.model';
import { BaseResourceService } from '../../../shared/services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {
  
  resource: T[] = [];

  valorTotal= 0.00;

  constructor(protected resourceService: BaseResourceService<T>) {}

  ngOnInit(): void {
    this.resourceService.getAll().subscribe(
      (resource) => (this.resource = resource.sort((a,b) => b.id - a.id))
    ),
      (error) => alert('Erro ao carregar a lista');
  }
  
  DeleteResource(resource) {
    const MsgConfirm = confirm('Deseja deletar realmente');
    if (MsgConfirm == true) {
      this.resourceService.delete(resource.id).subscribe(
        () =>
          (this.resource = this.resource.filter(
            (element) => element != resource
          )),
        () => alert('Error ao deletar')
      );
    }
  }
}
