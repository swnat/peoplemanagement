import { TestBed } from '@angular/core/testing';

import { StatusCandidateService } from './status-candidate.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('StatusCandidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule, HttpClientModule]
  }));

  it('should be created', () => {
    const service: StatusCandidateService = TestBed.get(StatusCandidateService);
    expect(service).toBeTruthy();
  });
});
