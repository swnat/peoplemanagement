import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInterviewComponent } from './edit-interview.component';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';


describe('EditInterviewComponent', () => {
  let component: EditInterviewComponent;
  let fixture: ComponentFixture<EditInterviewComponent>;
  let id: number = 1;

  beforeAll(() => {
    localStorage.setItem('statusChallenge', JSON.stringify({ id: 2, name: "SENT" }));
    localStorage.setItem('currentUser', JSON.stringify({ id: 4, rol: "user1" }));
    localStorage.setItem('user', '2');
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule, RouterTestingModule.withRoutes(
        [{ path: 'edit/:id', component: EditInterviewComponent },
        { path: 'interview', component: EditInterviewComponent },
        { path: '**', redirectTo: 'edit/' + id, pathMatch: 'full' }]
      ), ToastrModule.forRoot()],
      declarations: [EditInterviewComponent, HeaderComponent, DatePickerComponent],
      providers: [ToastrService,]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should invalidate the field day of the interview empty', () => {
    component.interviewEditForm.controls['dayOfInterview'].setValue('');
    expect(component.interviewEditForm.valid).toBeFalsy();
  });

  it('Should invalidate the field statusCandidate empty', () => {
    component.interviewEditForm.controls['statusCandidate'].setValue('');
    expect(component.interviewEditForm.valid).toBeFalsy();
  });

  // * Obs.: the field comment should accept number characters

  // should warning when put numbers in the field participant
  it('should warning when put numbers in the field participant', async(() => {
    let participant = fixture.debugElement.query(By.css('#participant')).nativeElement;
    participant.value = '12345';
    fixture.componentInstance.f.addParticipant.setValue('12345');
    // fixture.componentInstance.submitted = true;

    participant.dispatchEvent(new Event('input'));
    // fixture.debugElement.query(By.css('#add-btn')).nativeElement.click();
    fixture.detectChanges();
    const dom = fixture.debugElement;
    console.info('dom' + fixture.componentInstance.f.comment);

    const hint = dom.query(By.css('#participant-only-characters'));
    console.info('foo' + hint);

    expect(hint.nativeElement.innerText).toMatch('Participant has to be only characters');
  }));
});
