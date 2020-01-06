import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/service/record.service';
import { Record } from 'src/app/models/record';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilteringEventArgs, SelectEventArgs, RemoveEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-list-record',
  templateUrl: './list-record.component.html',
  styleUrls: ['./list-record.component.css'],
  providers: [NgbPaginationConfig]
})
export class ListRecordComponent implements OnInit {
  list_records: Record[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 5;
  page: number = 1;
  previousPage: any;
  showPagination: boolean;
  //public fields: Object = { text: 'nameCandidate', value: 'nameCandidate' };

  constructor(private recordService: RecordService, private router: Router, private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadData();
    console.log('Entro en list candidate');
    this.page = 1;
    this.previousPage = 1;
    
  }

  getAllRecord(page:number, itemsPerPage:number) {
    console.log("probando getAllcandidate");
    this.recordService.getAllRecord(page, itemsPerPage).subscribe(data => {
      if ((!data && !data.content) || (data && data.content && data.content.length == 0)) {
        this.list_records = [];
        this.showPagination = false;
      }else {
        this.list_records = <Record[]>data.content;
        this.totalItems = data.totalCount;
        this.itemsPerPage = 5;
        this.showPagination = true;
      }
    },
      error => {
        console.log('Error getAllCandidates', error);
        this.notificationService.showError('Occur an error when get all candidates', 'Error get all Candidates');
      });
  }


  loadData() {
    this.getAllRecord(this.page-1, this.itemsPerPage);
  }
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  collapse(index: number){
    //debugger;
    /*for(let i=0; i < this.list_records.length;i++){
        this.list_records[index].collapse = false;      
    }*/
    this.list_records[index].collapse = !this.list_records[index].collapse;
  }
}