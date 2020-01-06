import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterviewComponent } from './add-interview.component';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';


describe('AddInterviewComponent', () => {
  let component: AddInterviewComponent;
  let fixture: ComponentFixture<AddInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [ AddInterviewComponent, HeaderComponent, DatePickerComponent ],
      providers: [ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterviewComponent);
    component = fixture.componentInstance;
    localStorage.setItem('statusCandidate', JSON.stringify('{"id":4,"name":"Interview Team eLumen"}'));

    fixture.detectChanges();
  });

  it('Interview Form must be valid', () => {
    expect(component.interviewForm.valid).toBeFalsy();
  });

  it('if the required fields are not completed, it cannot be saved', async(()=>{
    component.interviewForm.controls['dayOfInterview'].setValue('');
    fixture.detectChanges();
    expect(component.interviewForm.valid).toBeFalsy();
    //invalid form cannot click in the button save
    spyOn(component, 'onSubmit');
    let bt = fixture.debugElement.query(By.css('.btn-pm')).nativeElement;
    bt.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));
});
