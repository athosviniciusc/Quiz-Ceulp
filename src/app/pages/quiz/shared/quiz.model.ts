import { Category } from '../../categories/shared/category.model';
import { BaseResourceModel } from '../../../shared/models/base-resource.model';
export class Quiz  extends BaseResourceModel{

  constructor(
    public id?: number,
    public title?: string,
    public theme?: string,
    public techinical?: string,
    public afiliation?: string,
    public date?: string,
    public local?: string,
    public categoryId?: number,
    public category?: Category

  ) {
    super();
  }

  static types = {
    expense: 'Despesa',
    revenue: 'Receita'
  };

  static fromJson(jsonData: any): Quiz{
    return Object.assign(new Quiz(), jsonData);
  }

}
