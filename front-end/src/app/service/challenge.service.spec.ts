import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ChallengeService } from './challenge.service';

describe('ChallengeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule, HttpClientModule]
  }));

  it('should be created', () => {
    const service: ChallengeService = TestBed.get(ChallengeService);
    expect(service).toBeTruthy();
  });
});
