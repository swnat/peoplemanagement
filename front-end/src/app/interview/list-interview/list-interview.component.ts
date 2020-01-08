import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Interview } from 'src/app/models/interview';
import { CandidateService } from 'src/app/service/candidate.service';
import { Candidate } from 'src/app/models/candidate';
import { StatusCandidateService } from 'src/app/service/status-candidate.service';
import { StatusCandidate } from 'src/app/models/status-candidate';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { Router, ActivatedRoute } from '@angular/router';
import { InterviewWorkflowService } from 'src/app/service/interview-workflow.service';
import { Approval } from 'src/app/models/approval';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-list-interview',
  templateUrl: './list-interview.component.html',
  styleUrls: ['./list-interview.component.css']
})
export class ListInterviewComponent implements OnInit {
  list_interview: Array<Interview>;
  candidate: Candidate;
  statusCandidate: StatusCandidate[];
  statusCandidateSelect: StatusCandidate;
  isDisabled: boolean;
  isFinish: boolean;
  clicked = false;
  submitted: boolean = false;
  @Input() candidateId:number;
  user: User;

  constructor(
    private candidateService: CandidateService, 
    private statusCandidateService: StatusCandidateService, 
    private router: Router,
    private storageService: StorageService,
    private userService: UserService,
    private interviewWFService: InterviewWorkflowService, 
    private notificationService: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //const id = +this.route.snapshot.paramMap.get('id');
    console.log('ListInterview', this.candidateId);
    if(this.candidateId !== 0) {
     
      this.getInterviewByCandidate(this.candidateId);

    }
    this.userService.getUser(this.storageService.getCurrentId()).subscribe(
      data => {
        this.user = data;
      });
    this.getStatusCandidate();
  }
  /* POPUP */
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;

  // Initialize the Dialog component's target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }

  // Hide the Dialog when click the footer button.
  public hideDialog: EmitType<object> = (s:any) => {
    const approval= new Approval(null,  this.user.name, this.candidate.id.toString(), null);//define the user !!!

    if(s === "OK") {
      this.interviewWFService.completeProcess(approval).subscribe(
        data => {
          this.finishProcessSuccess(data);
          this.getInterviewByCandidate(this.candidate.id);//new
        },
        error => this.finishProcessError(error)
      );
    }

    this.ejDialog.hide();
  }

  finishProcessSuccess(data: boolean) {
    this.isFinish= !data;
    console.log('Interviews process ended successfully', data);
    this.notificationService.showSuccess(this.candidate.name + ' ' + this.candidate.lastName, 'The interviews process ended successfully');
  }

  finishProcessError(error) {
    console.log('Interviews process ended has erros', error);
    this.notificationService.showError(this.candidate.name + ' ' + this.candidate.lastName, 'Error occurred at the end of the interview process');
  }

  // Enables the footer buttons
  public buttons: Object = [
    {
      'click': this.hideDialog.bind(this, 'OK'),
      // Accessing button component properties by buttonModel property
      buttonModel: {
        content: 'OK',
        // Enables the primary button
        isPrimary: true
      }
    },
    {
      'click': this.hideDialog.bind(this, 'Cancel'),
      buttonModel: {
        content: 'Cancel'
      }
    }
  ];

  // Sample level code to handle the button click action
  public onOpenDialog = function(even: any):void {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  };

  getStatusCandidate() {
    this.statusCandidateService.getStatusCandidate().
      subscribe(data => this.statusCandidate = data,
      error => {
        console.log('Error to get status Candidate', error);
        this.notificationService.showError('Occur an error when get types of interview', 'Error get types of interviews');
      });
  }

  toAddInterview(statusCandidate: StatusCandidate) {
    //get the candidateId
    this.candidate = this.candidateService.getCandidateSelected();
    if(statusCandidate) {
      this.statusCandidateService.statusCandidateSelected = statusCandidate;
      localStorage.setItem('candidateId', this.candidate.id.toString());
      
      this.router.navigate(['interview/add/']);
    }else{
      this.notificationService.showInfo('Select an Interview', '');
    }

  }

  toEditInterview(id: number) {
    localStorage.setItem('candidateId', this.candidate.id.toString());
    this.router.navigate(['interview/edit/'+id]);
  }

  /** GET AN ARRAY OF ALL INTERVIEW ABOUT ONE CANDIDATE
  *@param list_interview
  */
  getInterviewByCandidate(id: number) {
    this.candidateService.getCandidate(id).subscribe(data => {
      this.candidate = data;
      console.log('Candidate data', data);
      this.list_interview = this.candidate.interviews;
      this.setFinishProcessByCandidate();

      data.interviews.length > 2 ?
      this.isDisabled = true : 
      this.isDisabled = false;
    },
    error => {
      console.log('Error to get data of the candidate', error);
      this.notificationService.showError('Occur an error when get data of the candidate', 'Error get Candidate');
    });
  }

  setFinishProcessByCandidate() {
    this.candidate.interviewStatus === 'COMPLETED' ? this.isFinish = true : this.isFinish = false;
  }
}
