import { TestBed, async, inject } from '@angular/core/testing';

import { NoLoginGuard } from './no-login.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('NoLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoLoginGuard],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([NoLoginGuard], (guard: NoLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
