import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Candidate } from 'src/app/models/candidate';
import { Challenge } from 'src/app/models/challenge';
import { StatusChallenge } from 'src/app/models/status-challenge';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { ChallengeService } from 'src/app/service/challenge.service';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';
import { StatusChallengeService } from 'src/app/service/status-challenge.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/service/candidate.service';
import { ChallengeWorkflowService } from 'src/app/service/challenge-workflow.service';
import { ChallengeWorkflow } from 'src/app/models/challenge-workflow';
import { ChallengeForm, Action } from 'src/app/models/challenge-form';
import { Approval } from 'src/app/models/approval';
import { User } from 'src/app/models/user';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-challenge',
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.css']
})
export class AddChallengeComponent implements OnInit {

  @ViewChild('ejDatePicker') ejDatePicker: DatePickerComponent;
  challengeForm: FormGroup;
  candidate: Candidate;
  challenge: Challenge;
  isNew = true;
  statusChallenge: StatusChallenge[];
  isDisabled: boolean;
  isFinish: boolean;
  clicked = false;
  taskId: string;
  opcionChallenge: string;
  public targetElement: HTMLElement;
  submitted = false;
  @Input() candidateId: number;
  @Output() showInterview = new EventEmitter();
  public formObject: FormValidator;
  statusChallengeList: Array<StatusChallenge>;
  list_challenge: Array<Challenge>;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private challengeService: ChallengeService,
    private notificationService: NotificationService,
    private statusChallengeService: StatusChallengeService,
    private router: Router,
    private storageService: StorageService,
    private userService: UserService,
    private candidateService: CandidateService,
    private challengeWFService: ChallengeWorkflowService,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.initializeForm();
    this.getStatusChallenge();
    // Get the user login
    this.userService.getUser(this.storageService.getCurrentId()).subscribe(
      data => {
        this.user = data;
      });

    if (this.candidateId !== 0) {
      this.candidateService.getCandidate(this.candidateId).subscribe(data => {
        this.candidate = data;
        this.challengeService.challengeSelected = data.challenge;
        this.list_challenge = data.challenge;
        if (this.list_challenge.length > 0) {
          this.challenge = this.list_challenge[0];
          console.log('Datos Challenge', this.challenge);
          this.isNew = false;
          this.editChallenge(this.challenge);
        }
      });
    }
    this.validateDayOfChallenge();
  }
  get f() { return this.challengeForm.controls; }
  editChallenge(challenge: Challenge) {
    this.challengeForm.patchValue({
      id: challenge.id,
      comment: challenge.comment,
      dayOfSent: challenge.dayOfSent,
      dayOfExpected: challenge.dayOfExpected,
      reviewer: challenge.reviewer,
      linkChallenge: challenge.linkChallenge,
      statusChallenge: challenge.statusChallenge.id,
      taskId: challenge.taskId,
      candidate: challenge.candidate,
      isfinishProcess: challenge.isfinishProcess
    });

  }

  initializeForm() {
    this.challengeForm = this.formBuilder.group({
      id: new FormControl(''),
      comment: new FormControl(''),
      dayOfSent: new FormControl('', [Validators.required]),
      dayOfExpected: new FormControl(''),
      reviewer: new FormControl(''),
      linkChallenge: new FormControl(''),
      statusChallenge: new FormControl(''),
      taskId: new FormControl(),
      candidate: new FormControl(),
      isfinishProcess: new FormControl()
    });
  }

  challengeSaved(challengeSaved: Challenge) {
    console.log('Challenge saved ' + challengeSaved);
    this.showInterview.emit(true);
    this.notificationService.showSuccess(this.candidate.nameCandidate, 'Challenge created succesfully.');
  }

  challengeEdit(challengeEdit: Challenge) {
    console.log('Candidate edited ', challengeEdit);
    this.showInterview.emit(true);
    this.challengeService.challengeSelected = challengeEdit;
    this.notificationService.showSuccess(this.candidate.nameCandidate, 'Challenge edited succesfully.');
    const approval = new Approval(null, this.user.name, this.candidate.id.toString(), null); // define the user !!!
    if (challengeEdit.statusChallenge.name === 'REVIEWED') {
      this.challengeWFService.completeProcess(approval).subscribe(
        data => {
          this.finishProcessSuccess(data);
        },
        error => {
          this.finishProcessError(error);
        });
    }
  }

  public onSubmit() {
    this.submitted = true;
    this.candidate = this.candidateService.getCandidateSelected();
    // variables of sending date and expected date
    let sentDay = new Date();
    let expectedDay = new Date();
    sentDay = this.challengeForm.value.dayOfSent;
    expectedDay = this.challengeForm.value.dayOfExpected;

    console.log('Challenge candidate id nuevo', JSON.stringify(this.candidate));
    this.setStatusChallenge();
    this.challengeForm.controls['candidate'].setValue(this.candidate);
    // start and end date validation
    if (this.datePipe.transform(sentDay, 'yyyy-MM-dd') > this.datePipe.transform(expectedDay, 'yyyy-MM-dd')) {
      this.notificationService.showError(this.candidate.nameCandidate, 'Date sent is greater than expected date');
      return;
    }
    if (this.isNew) {
      if (this.challengeForm.invalid) {
        return;
      } else {
        this.candidateId = this.candidate.id;
        this.startProcessChallenge();
      }
    } else {
      console.log('Editar Challenge: ', this.challengeForm.value);
      if (this.challengeForm.invalid) {
        return;
      } else {
        this.startProcessEditChallenge();
      }
    }

  }

  setFinishProcessByChallenge() {
    this.candidate.process_challenge_status === 'COMPLETE' ? this.isFinish = true : this.isFinish = false;
  }

  finishProcessSuccess(data: boolean) {
    this.isFinish = !data;
    console.log('Challenge process ended successfully', data);
    this.notificationService.showSuccess(this.candidate.name + ' ' + this.candidate.lastName, 'The challenge process ended successfully');
  }

  finishProcessError(error) {
    console.log('Challenge process ended has error', error);
    this.notificationService.showError(this.candidate.name + ' ' + this.candidate.lastName,
     'Error occurred at the end of the challenge process');
  }

  getStatusChallenge() {
    this.statusChallengeService.getStatusChallenge().
      subscribe(data => this.statusChallengeList = data,
        error => {
          console.log('Error to get status Challenge', error);
          this.notificationService.showError('Occur an error when get status challenge', 'Error get status challenge');
        });
  }

  setStatusChallenge() {

    this.statusChallengeList.forEach(s => {

      if (s.id === this.challengeForm.get('statusChallenge').value) {
        console.log('Guardar id:', s);
        this.challengeForm.controls['statusChallenge'].setValue(s);
      }
    });
  }

  getStatusChallengeList() {
    this.statusChallengeService.getStatusChallenge().subscribe(data => {
      this.statusChallengeList = data;
    });
  }

  startProcessEditChallenge() {
    const challengeWF = new ChallengeWorkflow(this.user.name, this.candidateId, this.challengeForm.value, Action.EDIT);
    challengeWF.challenge.candidate = undefined;
    this.challengeWFService.startProcess(challengeWF).subscribe(data => {
      const challengeForm = new ChallengeForm(data.comment, data.dayOfSent, data.dayOfExpected, data.statusChallenge,
        data.linkChallenge, data.taskId, data.reviewer, this.user.name, this.candidateId, Action.EDIT);

      this.challengeWFService.completeTaskWithForm(challengeForm).subscribe(() => {
        this.challengeEdit(data);
      });

    }, error => {
      console.log('Error start process Challenge', error);
      this.notificationService.showError(this.candidate.name + ' ' + this.candidate.lastName, 'Error occurred in edit Challenge');
    });
  }

  startProcessChallenge() {

    const challengeWF = new ChallengeWorkflow(this.user.name, this.candidateId, this.challengeForm.value, Action.ADD);
    challengeWF.challenge.candidate = undefined;
    this.challengeWFService.startProcess(challengeWF).subscribe(data => {
      const challengeForm = new ChallengeForm(data.comment, data.dayOfSent, data.dayOfExpected, data.statusChallenge,
        data.linkChallenge, data.taskId, data.reviewer, this.user.name, this.candidateId, Action.ADD);
      console.log('Crear Challenge:', this.challengeForm.value);
      this.challengeWFService.completeTaskWithForm(challengeForm).subscribe();
      this.challengeSaved(data);
    }, error => {
      console.log('Error start process Challenge', error);
      this.notificationService.showError(this.candidate.name + ' ' + this.candidate.lastName, 'Error occurred in save Challenge');
    });
  }

  validateDayOfChallenge() {
    const options: FormValidatorModel = {
      rules: {
        'dayOfSent': {
          required: [true, 'Day of the challenge sent is required'],
          date: ['yyyy-MM-dd', 'Enter a valid Date'],
          maxLength: 10
        },
        'dayOfExpected': {
          required: [true, 'Day of the challenge expected is required'],
          date: ['yyyy-MM-dd', 'Enter a valid Date'],
          maxLength: 10
        }
      },
      customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
        inputElement.parentElement.parentElement.appendChild(errorElement);
      }
    };

    this.formObject = new FormValidator('#challengeForm', options);
  }
  // Form validation takes place when focus() event of DatePicker is triggered.
  public onFocusOut(): void { this.formObject.validate('dayOfSent'), this.formObject.validate('dayOfExpected'); }
  // Custom validation takes place when value is changed.
  public onChange(args: any) {
    if (this.ejDatePicker.value != null) {
      this.formObject.validate('dayOfSent');
    }
    this.formObject.validate('dayOfExpected');
  }
}
