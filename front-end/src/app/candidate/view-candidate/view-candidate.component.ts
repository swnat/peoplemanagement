import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css']
})
export class ViewCandidateComponent implements OnInit {
  candidateId: number;
  showInterview = false;
  showChallenge = false;
  collapseValue: string;

  constructor(private route: ActivatedRoute) { }

  showInterviewAccordion(showInterview) {
    console.log('showInterviewAccordion', showInterview);
    this.showInterview = showInterview;
  }

  showChallengeAccordion(showChallenge) {
    console.log('showChallengeAccordion', showChallenge);
    this.showChallenge = showChallenge;
  }

  ngOnInit() {
    this.candidateId = +this.route.snapshot.paramMap.get('id');
    window.scrollTo(0, 0);
  }
}
