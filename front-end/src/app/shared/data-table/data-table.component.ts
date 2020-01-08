import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CandidateService } from 'src/app/service/candidate.service';
import { RowSetting } from 'src/app/models/row-setting';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilteringEventArgs, SelectEventArgs, RemoveEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { ResponseList } from 'src/app/models/responseList';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  providers: [NgbPaginationConfig]
})
export class DataTableComponent {
  @Input('rowItems') rowItems: ResponseList = { content: [], totalCount: 0 };
  @Input('rowSettings') rowSettings: RowSetting[] = [];
  @Input('showFilter') showFilter: boolean = false;
  @Input('showPagination') showPagination: boolean = false;
  @Input('filteringFields') filteringFields: Object;
  @Output('getAllData') getAllData = new EventEmitter();
  @Input('itemsPerPage') itemsPerPage: number = 5;
  totalItems: any;
  page: any = 1;

  ngOnChanges(changes: SimpleChanges) {
    let rowItems: ResponseList = changes.rowItems.currentValue;
    if (!rowItems && !rowItems.content) {
      this.rowItems = { content: [], totalCount: 0 };
    } else {
      this.totalItems = rowItems.totalCount;
    }
  }

  public onFiltering: EmitType<object> = (e: FilteringEventArgs) => {
    if (e.text == '') {
      this.loadPage(null);
      return;
    }
    if (e.text.length > 2) {
      this.getAllData.emit({ filter: e.text, page: 0, size: 1000 })
    }
  };

  public onSelect: EmitType<object> = (e: SelectEventArgs) => {
    this.rowItems.content = this.rowItems.content.filter(c => c['id'] === e.itemData['id']);
  };


  public onRemoved: EmitType<object> = (e: RemoveEventArgs) => {
    this.loadPage(null);
  }

  loadPage(page: number) {
    this.getAllData.emit({ filter: null, page: this.page - 1, size: this.itemsPerPage })
  }

}