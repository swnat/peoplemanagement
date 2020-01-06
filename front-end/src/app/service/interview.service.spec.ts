import { TestBed } from '@angular/core/testing';

import { InterviewService } from './interview.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('InterviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule, HttpClientModule]
  }));

  it('should be created', () => {
    const service: InterviewService = TestBed.get(InterviewService);
    expect(service).toBeTruthy();
  });
});
