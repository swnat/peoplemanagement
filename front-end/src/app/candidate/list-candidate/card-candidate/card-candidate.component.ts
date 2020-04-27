import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/models/candidate';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-card-candidate',
  templateUrl: './card-candidate.component.html',
  styleUrls: ['./card-candidate.component.css']
})
export class CardCandidateComponent implements OnInit {

  @Input() candidate: Candidate = null;
  toggle = false;

  constructor(private router: Router) { }

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

}
