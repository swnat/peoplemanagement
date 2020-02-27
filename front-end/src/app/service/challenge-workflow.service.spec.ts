import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChallengeWorkflowService } from './challenge-workflow.service';

describe('ChallengeWorkflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule, HttpClientModule]
  }));

  it('should be created', () => {
    const service: ChallengeWorkflowService = TestBed.get(ChallengeWorkflowService);
    expect(service).toBeTruthy();
  });
});
