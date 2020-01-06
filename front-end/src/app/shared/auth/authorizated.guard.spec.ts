import { TestBed, async, inject } from '@angular/core/testing';

import { AuthorizatedGuard } from './authorizated.guard';

describe('AuthorizatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizatedGuard]
    });
  });

  it('should ...', inject([AuthorizatedGuard], (guard: AuthorizatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
