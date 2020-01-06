import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { CandidateService } from './candidate.service';
import { HttpClientModule } from '@angular/common/http';


describe('CandidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule, HttpClientModule]
  }));

  it('should be created', () => {
    const service: CandidateService = TestBed.get(CandidateService);
    expect(service).toBeTruthy();
  });
});
