import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RecordService } from './record.service';
import { HttpClientModule } from '@angular/common/http';


describe('RecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterModule, HttpClientModule]
  }));

  it('should be created', () => {
    const service: RecordService = TestBed.get(RecordService);
    expect(service).toBeTruthy();
  });
});
