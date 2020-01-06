import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/service/candidate.service';
import { Candidate } from 'src/app/models/candidate';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilteringEventArgs, SelectEventArgs, RemoveEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css'],
  providers: [NgbPaginationConfig]
})
export class ListCandidateComponent implements OnInit {
  list_candidates: Candidate[] = [];
  list_candidateSelected: Candidate[] = [];
  totalItems: any;
  itemsPerPage: number = 5;
  page: any = 1;
  previousPage: any;
  showPagination: boolean;
  public placeholder: string = 'Introduce a name of Candidate to search';
  public fields: Object = { text: 'nameCandidate', value: 'nameCandidate' };

  constructor(private candidateService: CandidateService, private router: Router, private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadData();
    console.log('Entro en list candidate');
    this.page = 1;
    this.previousPage = 1;
    
  }

  //Bind the filter event
  public onFiltering: EmitType<object> = (e: FilteringEventArgs) => {
    // load overall data when search key empty.
    if (e.text == '') {
      //here have to show all the candidate
      if(this.list_candidateSelected.length > 0) {
        this.list_candidates = this.list_candidateSelected;
      }else{      
        this.loadData();
      }

      return;
    }
    // restrict the remote request until search key contains 3 characters.
    if (e.text.length > 2) {
      this.getAllCandidates(e.text, 0, 1000);
    }
  };

  //Bind the filter event
  public onSelect: EmitType<object> = (e: SelectEventArgs) => {
    var index = this.list_candidateSelected.findIndex(c => c.id === e.itemData['id']);
    if(index === -1) {
      this.list_candidates.forEach(c =>{
        if(c.id === e.itemData['id']) {
          this.list_candidateSelected.push(c);
        }
      });
    }

    this.list_candidates = this.list_candidateSelected;
  };
  //implement the close button
  public onRemoved: EmitType<object> = (e: RemoveEventArgs) => {
    this.list_candidateSelected = this.list_candidateSelected.filter(c => c.id !== e.itemData['id']);

    if(this.list_candidates.length === 1) {
      this.loadData();
    }else{
      this.list_candidates = this.list_candidates.filter(c => c.id !== e.itemData['id']);
    }
  }

  getAllCandidates(filter:string, page:number, itemsPerPage:number) {
    console.log("probando getAllcandidate");
    this.candidateService.getAllCandidates(filter, page, itemsPerPage).subscribe(data => {
      if ((!data && !data.content) || (data && data.content && data.content.length == 0)) {
        this.list_candidates = [];
        this.showPagination = false;
      }else {
        this.list_candidates = <Candidate[]>data.content;
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

  toViewCandidateAdd() {
    this.router.navigate(['candidate/data/']);
  }

  toViewCandidateEdit(candidateId:number) {
    this.router.navigate(['candidate/data/'+candidateId]);
  }

  loadData() {
    this.getAllCandidates(null, this.page-1, this.itemsPerPage);
    
    console.log(this.getAllCandidates(null, this.page-1, this.itemsPerPage));
  }
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }
}