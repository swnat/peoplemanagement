import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/models/candidate';

@Component({
  selector: 'app-card-candidate',
  templateUrl: './card-candidate.component.html',
  styleUrls: ['./card-candidate.component.css']
})
export class CardCandidateComponent implements OnInit {

  @Input() candidate: Candidate;

  constructor() { }

  ngOnInit() {
    console.log(this.candidate);
  }

  /* should return a string no longer than 15 characters */
  get candidateName(): string {
    return 'Juan Pérez ...';
  }

  get statusChallenge(): string {
    return 'completed';
  }

  get statusInterview(): string {
    return 'in_process';
  }

}
