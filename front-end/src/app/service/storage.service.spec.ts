import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule]
  }));

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });
});
