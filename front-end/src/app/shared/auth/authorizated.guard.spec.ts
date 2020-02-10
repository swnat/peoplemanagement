import { TestBed, async, inject } from '@angular/core/testing';

import { AuthorizatedGuard } from './authorizated.guard';
import { RouterTestingModule } from '@angular/router/testing';


describe('AuthorizatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizatedGuard],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([AuthorizatedGuard], (guard: AuthorizatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
