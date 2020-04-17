import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Candidate } from 'src/app/models/candidate';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CandidateService } from 'src/app/service/candidate.service';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';

@Component({
  selector: 'app-card-candidate',
  templateUrl: './card-candidate.component.html',
  styleUrls: ['./card-candidate.component.css']
})
export class CardCandidateComponent implements OnInit {

  @Output() updateListCandidate = new EventEmitter<boolean>();

  @Input() candidate: Candidate = null;
  toggle = false;

  constructor(private router: Router, private candidateService: CandidateService, 
  private notificacionService: NotificationService) { }

  ngOnInit() {}

  // go to candidate profile page
  onClick() {
    let url = '/candidate/data/';
    if (this.candidate) { url += this.candidate.id; }
    this.router.navigateByUrl(url);
  }

  // should return a string no longer than 16 characters
  get candidateName(): string {
    const MAX = 17;
    let name: string = this.candidate ? `${this.candidate.name} ${this.candidate.lastName}`.trim() : '-';
    if (name.length > MAX) { name = `${name.substr(0, MAX - 3)}...`; }
    return name;
  }

  get statusChallenge(): string {
    const stch = this.candidate ? this.candidate.process_challenge_status : '';
    if (stch.match(/pending/i)) { return 'Pending'; }
    if (stch.match(/pro/i)) { return 'In_Process'; }
    if (stch.match(/completed/i)) { return 'Completed'; }
    return 'undefined';
  }

  get statusInterview(): string {
    const stint = this.candidate ? this.candidate.interviewStatus : '';
    if (stint.match(/pending/i)) { return 'Pending'; }
    if (stint.match(/pro/i)) { return 'In_Process'; }
    if (stint.match(/completed/i)) { return 'Completed'; }
    return 'undefined';
  }

  // build and return the url in the image.
  get imageConstruction(): string {
    if ( this.candidate.profileImage) {
        let basePath = "/api/v1/uploads/";
        return environment.apiUrl + basePath + this.candidate.profileImage;
      }
    else { return null; }
  }

  // get resume CV
  getResume() {
    this.toggle = false;
    const basePath = '/api/v1/uploads/';
    window.open(environment.apiUrl + basePath + this.candidate.resumeUrl);
  }

  closedOption(e: Event) {
    this.toggle = false;
  }

  openOption() {
    this.toggle = !this.toggle;
  }

  removeCandidate(){
    this.candidateService.deleteCandidate(this.candidate.id).subscribe( data =>{
      console.log(data);
      if ( data == "It has associated data" ){
        this.notificacionService.showInfo('The candidate has data associated with either a challenge, interview or both.', 'Cannot remove the candidate');
        //An event is issued to the parent 
        this.updateListCandidate.emit(false);
      }
      else{
        this.notificacionService.showSuccess('The candidate was correctly eliminated', 'Successfully eliminated');
        this.updateListCandidate.emit(true);
      }
    }, error =>{
        console.log(error);
        this.notificacionService.showError('An error occurs when eliminating a candidate', 'Error in removing a candidate');
    });
  }

}
