import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Candidate } from 'src/app/models/candidate';
import { InterviewService } from 'src/app/service/interview.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { InterviewWorkflowService } from 'src/app/service/interview-workflow.service';
import { StatusCandidate } from 'src/app/models/status-candidate';
import { Interview } from 'src/app/models/interview';
import { InterviewWorkflow } from 'src/app/models/interview-workflow';
import { CandidateService } from 'src/app/service/candidate.service';
import { StatusCandidateService } from 'src/app/service/status-candidate.service';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';
import { InterviewForm, Action } from 'src/app/models/interview-form';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-edit-interview',
  templateUrl: './edit-interview.component.html',
  styleUrls: ['./edit-interview.component.css']
})
export class EditInterviewComponent implements OnInit {
  @ViewChild('ejDatePicker') ejDatePicker: DatePickerComponent;
  public targetElement: HTMLElement;
  submitted = false;
  elseBlock: boolean ;
  interviewEditForm: FormGroup;
  statusCandidateList: Array<StatusCandidate>;
  candidate: Candidate;
  interview: Interview;
  listParticipants: string[];
  addParticipant: string;
  taskId: string;
  placeholder = 'Day of the Interview';
  public formObject: FormValidator;
  statusCandidate: StatusCandidate;
  candidateId: any;
  user: User;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private userService: UserService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private interviewService: InterviewService,
    private interviewWFService: InterviewWorkflowService,
    private candidateService: CandidateService,
    private statusCandidateService: StatusCandidateService) { }

  ngOnInit() {
    this.initializeForm();
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(this.storageService.getCurrentId()).subscribe(
      data => {
        this.user = data;
        console.log('Candidate data', data);
      });
    this.getInterview(id);
    this.listParticipants = [];
    this.getCandidate();
    this.getStatusCandidate();

    window.scrollTo(0, 0); // scroll to top
  }

  validateDayOfInterview() {
    const options: FormValidatorModel = {
      rules: {
          'dayOfInterview': {
              required: [true, 'Day of the interview is required'],
              date: ['yyyy-MM-dd', 'Enter a valid Date'],
              maxLength: 10
          }
      },
      customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
          inputElement.parentElement.parentElement.appendChild(errorElement);
      }
    };

    this.formObject = new FormValidator('#interviewEditForm', options);
  }

  // Form validation takes place when focus() event of DatePicker is triggered.
  public onFocusOut(): void {
    this.formObject.validate('dayOfInterview');
  }
  // Custom validation takes place when value is changed.
  public onChange(args: any) {
    if (this.ejDatePicker.value != null) {
      this.formObject.validate('dayOfInterview');
    }
  }

  get f() {return this.interviewEditForm.controls; }

  initializeForm() {
    this.interviewEditForm = this.formBuilder.group({
      id: new FormControl(''),
      comment: new FormControl('', [Validators.maxLength(300)]), // only letters
      dayOfInterview: new FormControl('', [Validators.required]),
      candidate: new FormControl(),
      taskId: new FormControl(),
      addParticipant: new FormControl('', [Validators.pattern('[/a-zA-ZáéíóúÁÉÍÓÚñÑ ]*'), Validators.maxLength(90)]),
      statusCandidate: new FormControl(''),
      participants: new FormControl('', [Validators.required])
    });
  }

  getInterview(id: number) {
    this.interviewService.getInterview(id).subscribe(data => {
      this.loadForm(data);
      this.listParticipants = data.participants;
    }, error => {
      console.log('Error get Interview', error);
      this.notificationService.showError('Occur an error when get interview of the candidate', 'Error get Interview');
    });
  }

  getStatusCandidate() {
    this.statusCandidateService.getStatusCandidate().subscribe(data => {this.statusCandidateList = data; },
      error => {
        console.log('Error get Status Candidate', error);
        this.notificationService.showError('Occur an error when get status candidate', 'Error get Status Candidate');
      });
  }
  getCandidate() {
    this.candidateId = localStorage.getItem('candidateId');
    this.candidateService.getCandidate(this.candidateId).subscribe(
      data => {this.candidate = data; },
      error => {
        console.log('Error get Candidate', error);
        this.notificationService.showError('Occur an error when get data of the candidate', 'Error get Candidate'); });
  }

  addParticipants() {
    this.submitted = false;
    if (this.interviewEditForm.controls['addParticipant'].errors == null) {
      this.listParticipants.push(this.interviewEditForm.controls['addParticipant'].value);
      this.interviewEditForm.controls['addParticipant'].setValue('');
    }
  }

  removeParticipants(i: number) {
    this.listParticipants.splice(i, 1);
  }

  loadForm(interview: Interview) {
    this.interviewEditForm.patchValue({
      id: interview.id,
      comment: interview.comment,
      dayOfInterview: interview.dayOfInterview,
      candidate: interview.candidate,
      statusCandidate: interview.statusCandidate.id,
      taskId: interview.taskId,
      participants: interview.participants
    });
  }

  startProcessInterview() {
    const interviewWF = new InterviewWorkflow(this.user.name, this.candidateId, this.interviewEditForm.value, Action.EDIT);
    interviewWF.interview.candidate = undefined;
    this.interviewWFService.startProcess(interviewWF).subscribe(data => {
      const interviewForm = new InterviewForm(data.comment, data.dayOfInterview,
        data.statusCandidate, data.taskId, data.participants, this.user.name, this.candidateId, Action.EDIT);

      this.interviewWFService.completeTaskWithForm(interviewForm).subscribe();
      this.interviewEdited(data);
    }, error => {
      console.log('Error start process Interview', error);
      this.notificationService.showError(this.candidate.name + ' ' + this.candidate.lastName, 'Error occurred in edit Interview');
    });
  }

  backToList(id: number) {
    this.router.navigate(['/candidate/data/' + id]);
  }

  // Messange about process was succesfully
  interviewEdited(interview: Interview) {
    console.log('Interview edit ' + interview);
    this.interviewEditForm.reset();
    this.backToList(this.candidate.id);
    this.notificationService.showSuccess(interview.statusCandidate.name, 'Interview edit succesfully.');
  }

  getStatusCandidateList() {
    this.statusCandidateService.getStatusCandidate().subscribe(data => {
      this.statusCandidateList = data;
    });
  }

  setStatusCandidate() {
    this.statusCandidateList.forEach(s => {
      if ( s.id === this.interviewEditForm.get('statusCandidate').value ) {
        this.interviewEditForm.controls['statusCandidate'].setValue(s);
      }
    });
  }

  cancelInterview() {
    this.backToList(this.candidate.id);
  }

  public onSubmit() {
    this.interviewEditForm.controls['participants'].setValue(this.listParticipants);
    console.log('IMPORTANTE', this.interviewEditForm.value);
    this.interviewEditForm.controls['candidate'].setValue(this.candidate);
    this.setStatusCandidate();
    this.submitted = true;
    if (this.interviewEditForm.invalid) {
      return;
    } else {
      // set candidate value
      this.interviewEditForm.controls['candidate'].setValue(this.candidate);
      this.startProcessInterview();
    }
  }
}
