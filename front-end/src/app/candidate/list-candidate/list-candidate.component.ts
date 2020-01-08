import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/service/candidate.service';
import { Candidate } from 'src/app/models/candidate';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilteringEventArgs, SelectEventArgs, RemoveEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';
import { ResponseList } from 'src/app/models/responseList';
import { RowSetting } from 'src/app/models/row-setting';
import { Interview } from 'src/app/models/interview';
import { DataRequest } from 'src/app/models/data-request';

@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css'],
  styles: ['.doesntinterviewId { padding-left: 40px;}'],
  providers: [NgbPaginationConfig]
})
export class ListCandidateComponent implements OnInit {
  rowItems: ResponseList = { content: [], totalCount: 0 };
  rowSettings: RowSetting[] = [{
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
  }];
  filteringFields: Object = { text: 'nameCandidate', value: 'nameCandidate' };

  constructor(private candidateService: CandidateService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    console.log('Entro en list candidate');
    this.getAllCandidates({ filter: null, page: 0, size: 5 });
  }

  public getAllCandidates(request: DataRequest): void {
    console.log("probando getAllcandidate");
    this.candidateService.getAllCandidates(request.filter, request.page, request.size).subscribe(data => {
      this.rowItems = data;
      for (let j = 0; j < data.content.length; j++) {
        if (data.content[j]['interviews'].length > 0) {
          data.content[j]['interviewsFormat'] =
            '<ul style="list-style-type:none;"><li>' +
            data.content[j]['interviews'].reduce(
              (a, b, i) => i == 0 ? b.statusCandidate.name : a +
                '</li><li>' +
                b.statusCandidate.name, '') +
            '</li></ul>';
        } else {
          data.content[j]['interviewsFormat'] = "<div style='padding-left: 40px;'>This candidate doesn't have interviews</div>";
        }
        data.content[j]['details'] = {
          action: () => this.router.navigate(['candidate/data/' + data.content[j]['id']]),
          actionName: 'Edit'
        };
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
}