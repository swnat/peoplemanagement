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
  // tslint:disable-next-line: no-input-rename
  @Input('rowItems') rowItems: ResponseList = { content: [], totalCount: 0 };
  // tslint:disable-next-line: no-input-rename
  @Input('rowSettings') rowSettings: RowSetting[] = [];
  // tslint:disable-next-line: no-input-rename
  @Input('showFilter') showFilter = false;
  // tslint:disable-next-line: no-input-rename
  @Input('showPagination') showPagination = false;
  // tslint:disable-next-line: no-input-rename
  @Input('filteringFields') filteringFields: Object;
  // tslint:disable-next-line: no-output-rename
  @Output('getAllData') getAllData = new EventEmitter();
  // tslint:disable-next-line: no-input-rename
  @Input('itemsPerPage') itemsPerPage = 5;
  totalItems: any;
  page: any = 1;

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    const rowItems: ResponseList = changes.rowItems.currentValue;
    if (!rowItems && !rowItems.content) {
      this.rowItems = { content: [], totalCount: 0 };
    } else {
      this.totalItems = rowItems.totalCount;
    }
  }

  public onFiltering: EmitType<object> = (e: FilteringEventArgs) => {
    if (e.text === '') {
      this.loadPage(null);
      return;
    }
    if (e.text.length > 2) {
      this.getAllData.emit({ filter: e.text, page: 0, size: 1000 });
    }
  }

  public onSelect: EmitType<object> = (e: SelectEventArgs) => {
    this.rowItems.content = this.rowItems.content.filter(c => c['id'] === e.itemData['id']);
  }


  public onRemoved: EmitType<object> = (e: RemoveEventArgs) => {
    this.loadPage(null);
  }

  loadPage(page: number) {
    this.getAllData.emit({ filter: null, page: this.page - 1, size: this.itemsPerPage });
  }

}
