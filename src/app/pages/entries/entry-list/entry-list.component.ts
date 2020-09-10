import { Component } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']

})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

  constructor(protected EntryService: EntryService) {
    super(EntryService);
  }
}
