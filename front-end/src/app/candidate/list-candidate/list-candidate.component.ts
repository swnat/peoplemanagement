import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/service/candidate.service';
import { Candidate } from 'src/app/models/candidate';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';
import { ResponseList } from 'src/app/models/responseList';
// import { RowSetting } from 'src/app/models/row-setting';
import { DataRequest } from 'src/app/models/data-request';

@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css'],
  providers: [NgbPaginationConfig]
})
export class ListCandidateComponent implements OnInit {
  /*rowSettings: RowSetting[] = [{
    label: 'Candidate',
    key: 'nameCandidate'
  }, {
    label: 'Interviews',
    key: 'interviewsFormat'
  }, {
    label: 'Interviews Status',
    key: 'interviewStatus'
  }, {
    label: 'Challenge Status',
    key: 'process_challenge_status'
  }, {
    label: 'Details',
    isAction: true,
    key: 'details'
  }];*/
  // filteringFields: Object = { text: 'nameCandidate', value: 'nameCandidate' };

  candidates: ResponseList = { content: [], totalCount: 0 };
  // pagination specific attributes
  page = 1;
  pageSize = 1;

  constructor(private candidateService: CandidateService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.getAllCandidates({ filter: null, page: 0, size: this.pageSize });
  }

  public loadPage(page: number){ 
    this.getAllCandidates({ filter: null, page: page - 1, size: this.pageSize });
  }

  public getAllCandidates(request: DataRequest): void {
    this.candidateService.getAllCandidates(request.filter, request.page, request.size).subscribe(data => {
      this.candidates = data;
      window.scrollTo(0,0); 
    },
    error => {
      console.log('Error getAllCandidates', error);
      this.notificationService.showError('An error occurred in getting the list of candidates', 'Error Get Candidates');
    });
  }

  toViewCandidateAdd() {
    this.router.navigate(['candidate/data/']);
  }
}
