import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StatusChallengeService } from './status-challenge.service';

describe('StatusChallengeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule, HttpClientModule]
  }));

  it('should be created', () => {
    const service: StatusChallengeService = TestBed.get(StatusChallengeService);
    expect(service).toBeTruthy();
  });
});
