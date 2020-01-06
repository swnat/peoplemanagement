import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InterviewWorkflowService } from './interview-workflow.service';

describe('InterviewWorkflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule, HttpClientModule]
  }));

  it('should be created', () => {
    const service: InterviewWorkflowService = TestBed.get(InterviewWorkflowService);
    expect(service).toBeTruthy();
  });
});
