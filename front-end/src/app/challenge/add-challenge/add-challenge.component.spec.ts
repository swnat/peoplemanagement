import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChallengeComponent } from './add-challenge.component';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('AddChallengeComponent', () => {
  let component: AddChallengeComponent;
  let fixture: ComponentFixture<AddChallengeComponent>;

  beforeAll(() => {
    localStorage.setItem('statusChallenge', JSON.stringify({ id: 2, name: 'SENT' }));
    localStorage.setItem('currentUser', JSON.stringify({ id: 4, rol: 'user1' }));
    localStorage.setItem('user', '2');
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [ AddChallengeComponent, HeaderComponent, DatePickerComponent ],
      providers: [ToastrService, DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChallengeComponent);
    component = fixture.componentInstance;
    component.candidateId = 1;
    fixture.detectChanges();
  });

  it('initially the challenge Form must be invalid', () => {
    expect(component.challengeForm.valid).toBeFalsy();
  });

  it('if the required fields are not completed, it cannot be saved', async(() => {
    component.challengeForm.controls['dayOfSent'].setValue('');
    component.challengeForm.controls['dayOfExpected'].setValue('');
    fixture.detectChanges();
    expect(component.challengeForm.valid).toBeFalsy();
    // invalid form cannot click in the button save
    spyOn(component, 'onSubmit');
    const bt = fixture.debugElement.query(By.css('.btn-pm')).nativeElement;
    bt.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));

});
