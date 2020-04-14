import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/service/candidate.service';
import { Candidate } from 'src/app/models/candidate';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';
import { ResponseList } from 'src/app/models/responseList';
import { DataRequest } from 'src/app/models/data-request';

@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css'],
  providers: [NgbPaginationConfig]
})
export class ListCandidateComponent implements OnInit {
  candidates: ResponseList = { content: [], totalCount: 0 };

  // pagination specific attributes
  page = 1;
  pageSize = 8;

  // filter candidate
  filterText = '';
  sortBy = 'LAST_MODIFIED'; // default last modified

  candidatesInDB = true;

  constructor(private candidateService: CandidateService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getAllCandidates({ filter: this.filterText, page: 0, size: this.pageSize });
  }

  public loadPage(page: number){ 
    this.getAllCandidates({ filter: this.filterText, page: page - 1, size: this.pageSize });
  }

  public getAllCandidates(request: DataRequest): void {
    this.candidateService.getAllCandidates(request.filter, request.page, request.size, this.sortBy).subscribe(data => {
      if (request.filter == '' && data.totalCount == 0) this.candidatesInDB = false;
      this.candidates = data;
      window.scrollTo(0, 0);
    },
    error => {
      console.log('Error getAllCandidates', error);
      this.notificationService.showError('An error occurred in getting the list of candidates', 'Error Get Candidates');
    });
  }

  toViewCandidateAdd() {
    this.router.navigate(['candidate/data/']);
  }

  filterCandidate() {
    this.getAllCandidates({ filter: this.filterText, page: 0, size: this.pageSize });
    this.page = 1;
  }

  changeSortBy() {
    this.getAllCandidates({ filter: this.filterText, page: 0, size: this.pageSize });
    this.page = 1;
  }

}
