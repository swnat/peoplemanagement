import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { StatusCandidate } from '../../models/status-candidate';
import { InterviewService } from '../../service/interview.service';
import { Candidate } from '../../models/candidate';
import { Router } from '@angular/router';
import { CandidateService } from '../../service/candidate.service';
import { Interview } from 'src/app/models/interview';
import { InterviewWorkflowService } from 'src/app/service/interview-workflow.service';
import { InterviewWorkflow } from 'src/app/models/interview-workflow';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { StatusCandidateService } from 'src/app/service/status-candidate.service';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { InterviewForm, Action } from 'src/app/models/interview-form';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.css']
})
export class AddInterviewComponent implements OnInit {
  @ViewChild('ejDatePicker') ejDatePicker: DatePickerComponent;
  public targetElement: HTMLElement;
  submitted: boolean = false;
  interviewForm: FormGroup;
  candidate: Candidate;
  taskId: string;
  participants: string[];
  addParticipant: string;
  comment: string;
  placeholder: string = 'Day of the Interview';
  statusCandidate: StatusCandidate;
  public formObject: FormValidator;
  candidateId: any;
  user: User;


  constructor(
    private formBuilder: FormBuilder, 
    private storageService: StorageService, 
    private userService: UserService, 
    private router: Router, 
    private interviewService: InterviewService, 
    private candidateService: CandidateService,
    private interviewWFService: InterviewWorkflowService, 
    private statusCandidateService: StatusCandidateService, 
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.participants = [];
    this.initializeForm();
    this.userService.getUser(this.storageService.getCurrentId()).subscribe(
      data => {
        this.user = data;
        console.log('Candidate data',data);
      });
    this.getCandidate();
    this.setStatusCandidate();
    this.validateDayOfInterview();
    window.scrollTo(0, 0); // scroll to top
  }

  validateDayOfInterview() {
    let options: FormValidatorModel = {
      rules: {
        'dayOfInterview': {
          required: [true, "Day of the interview is required"],
          date: ['yyyy-MM-dd', 'Enter a valid Date'],
          maxLength: 10
        }
      },
      customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
        inputElement.parentElement.parentElement.appendChild(errorElement);
      }
    };

    this.formObject = new FormValidator('#interviewForm', options);
  }

  // Form validation takes place when focus() event of DatePicker is triggered.
  public onFocusOut(): void { this.formObject.validate("dayOfInterview"); }
  // Custom validation takes place when value is changed.
  public onChange(args: any) {
    if (this.ejDatePicker.value != null)
      this.formObject.validate("dayOfInterview");
  }

  initializeForm() {
    this.interviewForm = this.formBuilder.group({
      comment: new FormControl('', [Validators.maxLength(300)]),
      dayOfInterview: new FormControl('', [Validators.required]),
      candidate: new FormControl(),
      taskId: new FormControl(),
      addParticipant: new FormControl('', [Validators.pattern('[/a-zA-ZáéíóúÁÉÍÓÚñÑ ]*'), Validators.maxLength(90)]),
      statusCandidate: new FormControl(''),
      participants: new FormControl('', [Validators.required])
    });
  }

  get f() { return this.interviewForm.controls; }

  getCandidate() {
    this.candidateId = localStorage.getItem('candidateId');
    this.candidateService.getCandidate(this.candidateId).subscribe(
      data => { this.candidate = data },
      error => {
        console.log('Error get Candidate', error);
        this.notificationService.showError('Occur an error when get data of the candidate', 'Error get Candidate');
      })
  }

  backToList(id: number) {
    this.router.navigate(['/candidate/data/' + id]);
  }

  addParticipants() {
    this.submitted = false;
    if (this.interviewForm.controls['addParticipant'].errors == null) {
      this.participants.push(this.interviewForm.controls['addParticipant'].value);
      this.interviewForm.controls['addParticipant'].setValue('');
    }
  }

  startProcessInterview() {
    const interviewWF = new InterviewWorkflow(this.user.name, this.candidateId, this.interviewForm.value, Action.ADD);
    interviewWF.interview.candidate = undefined;
    this.interviewWFService.startProcess(interviewWF).subscribe(data => {
      const interviewForm = new InterviewForm(data.comment, data.dayOfInterview, data.statusCandidate, 
        data.taskId, data.participants, this.user.name, this.candidateId, Action.ADD);

      this.interviewWFService.completeTaskWithForm(interviewForm).subscribe();

      this.interviewSaved(data);
    }, error => {
      console.log('Error start process Interview', error);
      this.notificationService.showError(this.candidate.name + ' ' + this.candidate.lastName, 'Error occurred in save Interview');
    });
  }

  interviewSaved(interview: Interview) {
    console.log('Interview created ' + interview);
    this.interviewForm.reset();
    this.backToList(this.candidate.id);
    this.notificationService.showSuccess(interview.statusCandidate.name, 'Interview created succesfully.');
  }

  setStatusCandidate() {
    if (localStorage.getItem('statusCandidate') != null && this.statusCandidateService.getStatusCandidateSelected() == null) {
      this.statusCandidate = JSON.parse(localStorage.getItem('statusCandidate') || null);
    } else {
      localStorage.setItem('statusCandidate', JSON.stringify(this.statusCandidateService.getStatusCandidateSelected()));
      this.statusCandidate = this.statusCandidateService.getStatusCandidateSelected();
    }
  }

  cancelInterview() {
    localStorage.removeItem('statusCandidate');
    this.backToList(this.candidate.id);
  }

  public onSubmit() {
    this.interviewForm.controls['participants'].setValue(this.participants);
    this.interviewForm.controls['statusCandidate'].setValue(this.statusCandidate);

    this.submitted = true;
    if (this.interviewForm.invalid) {
      return;
    } else {
      this.interviewForm.controls['candidate'].setValue(this.candidate);
      //start the process and add Interview
      this.startProcessInterview();
  }}
}