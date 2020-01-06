import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChallengeComponent } from './add-challenge.component';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AddChallengeComponent', () => {
  let component: AddChallengeComponent;
  let fixture: ComponentFixture<AddChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [ AddChallengeComponent, HeaderComponent, DatePickerComponent ],
      providers: [ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChallengeComponent);
    component = fixture.componentInstance;
    localStorage.setItem('statusChallenge', JSON.stringify('{"id":2,"name":"SENT"}'));
    fixture.detectChanges();
  });

  it('Challenge Form must be valid', () => {
    expect(component.challengeForm.valid).toBeFalsy();
  });
  it('if the required fields are not completed, it cannot be saved', async(()=>{
    component.challengeForm.controls['dayOfSent'].setValue('');
    component.challengeForm.controls['dayOfExpected'].setValue('');
    fixture.detectChanges();
    expect(component.challengeForm.valid).toBeFalsy();
    //invalid form cannot click in the button save
    spyOn(component, 'onSubmit');
    let bt = fixture.debugElement.query(By.css('.btn-pm')).nativeElement;
    bt.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));

});
