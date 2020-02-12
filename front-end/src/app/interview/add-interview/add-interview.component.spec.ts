import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterviewComponent } from './add-interview.component';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { User } from 'src/app/models/user';

const firstUser: User = {
  name: 'Elena',
  lastname: 'Coronel',
  email: 'elena@softwarenatura.com',
  active: true,
  rol: 'user1',
  phoneNumber: '',
  idUser: 4,
};

describe('AddInterviewComponent', () => {
  let component: AddInterviewComponent;
  let fixture: ComponentFixture<AddInterviewComponent>;
  let expectedUser: User;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [ AddInterviewComponent, HeaderComponent, DatePickerComponent ],
      providers: [ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    expectedUser = firstUser;
    fixture = TestBed.createComponent(AddInterviewComponent);
    component = fixture.componentInstance;
    localStorage.setItem('statusCandidate', JSON.stringify('{"id":4,"name":"Interview Team"}'));
    localStorage.setItem('currentUser', JSON.stringify({ "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0Iiwic2NvcGVzIjoidXNlcjEiLCJpYXQiOjE1NzY1ODUzMjEsImV4cCI6MTU4MTYzMzMyMX0.xBqWVdg7W8rqT7dHihiUqstQq6p3bJzhPJS7N1hE5GQR3rh6UTYxbLv1F9Zbex1_Q6mEuJR579G8uoNkHEL7WQ", "tokenType": "Bearer", "id": "4", "rol": "user1" }));
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
    let bt = fixture.debugElement.query(By.css('#save-btn')).nativeElement;
    bt.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));
});
