import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CandidateService } from 'src/app/service/candidate.service';
import { Candidate } from 'src/app/models/candidate';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import { Router } from '@angular/router';


@Component({
  selector: 'app-data-candidate',
  templateUrl: './data-candidate.component.html',
  styleUrls: ['./data-candidate.component.css']
})

export class DataCandidateComponent implements OnInit {
  dataCandidateForm: FormGroup;
  submitted = false;
  @Input() candidateId: number;
  candidate: Candidate;
  isNew = true;
  @Output() showChallenge = new EventEmitter();
  // Variable image
  imageUrl = '/assets/images/default.png';
  fileUpload: File = null;
  nameButton = 'Add Photo';
  activeRemove = false;
  imageBinary: string = null;

  constructor(private formBuilder: FormBuilder, private candidateService: CandidateService,
    private notificationService: NotificationService, private router: Router, ) { }

  ngOnInit() {
    this.initializeForm();

    if (this.candidateId !== 0) {
      this.candidateService.getCandidate(this.candidateId).subscribe(data => {
        this.candidate = data;
        console.log(data);
        this.candidateService.candidateSelected  = data;
        this.isNew = false;
        this.editCandidate(data);
      }, error => {
        console.log('Error to get data of the candidate', error);
        this.notificationService.showError('Occur an error when get data of the candidate', 'Error get Candidate');
      });
    }
  }

  editCandidate(candidate: Candidate) {
    this.dataCandidateForm.patchValue({
      name: candidate.name,
      email: candidate.email,
      lastName: candidate.lastName,
      phoneNumber: candidate.phoneNumber,
      university: candidate.university,
      dateOfBirth: candidate.dateOfBirth,
      resumeUrl: candidate.resumeUrl,
      filesUrl: candidate.filesUrl,
      decision: candidate.decision,
      comments: candidate.comments,
      interviewStatus: candidate.interviewStatus,
      processChallengeStatus: candidate.process_challenge_status,
      id: candidate.id
    });
    // load user profile picture
    if ( candidate.profileImage != null ) {
      this.imageUrl = candidate.profileImage;
      this.nameButton = 'Change Photo';
      this.activeRemove = true;
      this.imageBinary = candidate.profileImage;
    }

  }

  get f() { return this.dataCandidateForm.controls; }

  initializeForm() {
    this.dataCandidateForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.pattern('[/a-zA-ZáéíóúÁÉÍÓÚñÑ ]*'), Validators.maxLength(100), Validators.required]), // only letters
      email: new FormControl(''),
      lastName: new FormControl('', [Validators.pattern('[/a-zA-ZáéíóúÁÉÍÓÚñÑ ]*'), Validators.maxLength(100), Validators.required]), // only letters
      phoneNumber: new FormControl(''),
      university: new FormControl('', [Validators.maxLength(100)]), // only letters
      dateOfBirth: new FormControl(''),
      resumeUrl: new FormControl('', ),
      filesUrl: new FormControl(''),
      decision: new FormControl(''),
      comments: new FormControl('', [Validators.pattern('[/a-zA-ZáéíóúÁÉÍÓÚñÑ ]*'), Validators.maxLength(300)]), // only letters
      interviewStatus: new FormControl('PENDING'),
      process_challenge_status: new FormControl('PENDING')
    });
  }

  candidateSaved(candidateSaved: Candidate) {
    console.log('Candidate created ', candidateSaved);
    this.showChallenge.emit(true);
    // save the candidate Id
    this.candidateService.candidateSelected = candidateSaved;
    this.notificationService.showSuccess(candidateSaved.name, 'Candidate created succesfully.');
  }

  candidateEdit(candidateEdited: Candidate) {
    console.log('Candidate edited ', candidateEdited);
    this.showChallenge.emit(true);
    this.candidateService.candidateSelected = candidateEdited;
    this.notificationService.showSuccess(candidateEdited.name, 'Interview edited succesfully.');
  }

  public onSubmit() {
    this.submitted = true;

    if (this.dataCandidateForm.invalid) {
      return;
    } else {
      if (this.isNew) {
        this.candidateService.addCandidate(this.dataCandidateForm.value, this.imageBinary).subscribe(data => {
          this.candidate = data;
          this.candidateSaved(data);

          this.candidateId = this.candidate.id;
        }, error => {
          console.log('Error to save the candidate', error);
          this.notificationService.showError('Occur an error when save data of the candidate', 'Error save Candidate');
        });
      } else {
        this.candidateService.editCandidate(this.dataCandidateForm.value, this.imageBinary).subscribe(data => {
          this.candidate = data;
          this.candidateEdit(data);
          this.candidateId = this.candidate.id;
          this.candidate = this.candidateService.getCandidateSelected();

        }, error => {
          console.log('Error to edit the candidate', error);
          this.notificationService.showError('Occur an error when edit data of the candidate', 'Error edit Candidate');
        });
      }
    }
  }

  // Added method for uploading candidate's profile photo
  imageLoading(file: FileList) {
    const buttonAdd = 'Add Photo';

    if ( this.nameButton === buttonAdd || this.nameButton === 'Change Photo' ) {
      // Image file
      this.fileUpload = file.item(0);

      // Show image preview
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        this.imageBinary = event.target.result;
      };


      reader.readAsDataURL(this.fileUpload);
      this.nameButton = 'Change Photo';
      this.activeRemove = true;
    } else {
      
      this.imageUrl = '/assets/images/default.png';
      this.nameButton = buttonAdd;
    }

  }

  /*
  Added a keyboard event condition 
  so that this method is not triggered when 
  the enter key is pressed.
  */ 
  deleteButton(event: KeyboardEvent) {
    if (event.detail != 0){
      this.activeRemove = false;
      this.imageUrl = '/assets/images/default.png';
      this.nameButton = 'Add Photo';
      this.imageBinary = null;
    }
  }
}