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

  //should invalidate put numbers in the field comment
  it('should invalidate put numbers in the field comment', async(() => {
    let comment = fixture.debugElement.query(By.css('#comment')).nativeElement;
    comment.value = '12345';
    fixture.componentInstance.f.comment.setValue('112334');
    fixture.componentInstance.submitted = true;

    comment.dispatchEvent(new Event('textarea'));
    fixture.debugElement.query(By.css('#add-interview')).nativeElement.click();
    fixture.detectChanges();
    const dom = fixture.debugElement;
    console.info('dom' + fixture.componentInstance.f.comment);

    const hint = dom.query(By.css('#only-letter-comment'));
    console.info('foo' + hint);

    expect(hint.nativeElement.innerText).toMatch('Comment has to be only characters');
  }));
});