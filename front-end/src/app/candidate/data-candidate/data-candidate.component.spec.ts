import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCandidateComponent } from './data-candidate.component';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

describe('DataCandidateComponent', () => {
  let component: DataCandidateComponent;
  let fixture: ComponentFixture<DataCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule,BrowserAnimationsModule, ToastrModule.forRoot(), DatePickerModule],
      declarations: [ DataCandidateComponent, HeaderComponent ],
      providers: [ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCandidateComponent);
    component = fixture.componentInstance;
    

    fixture.detectChanges();
  });

  it('Data Form must be valid', () => {
    expect(component.dataCandidateForm.valid).toBeFalsy();
  });

  it('if the required fields are not completed, it cannot be saved', async(()=>{
    component.dataCandidateForm.controls['name'].setValue('');
    fixture.detectChanges();
    expect(component.dataCandidateForm.valid).toBeFalsy();
    //invalid form cannot click in the button save
    spyOn(component, 'onSubmit');
    let bt = fixture.debugElement.query(By.css('.btn-pm')).nativeElement;
    bt.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));

  it('if the name field is filled with numeric characters, it cannot be saved', async(()=>{
    component.dataCandidateForm.controls['name'].setValue('Candidato1');
    fixture.detectChanges();
    expect(component.dataCandidateForm.valid).toBeFalsy();
    //invalid form cannot click in the button save
    spyOn(component, 'onSubmit');
    let bt = fixture.debugElement.query(By.css('.btn-pm')).nativeElement;
    bt.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));

  it('if the lastname field is filled with numeric characters, it cannot be saved', async(()=>{
    component.dataCandidateForm.controls['lastName'].setValue('Apellido1');
    fixture.detectChanges();
    expect(component.dataCandidateForm.valid).toBeFalsy();
    //invalid form cannot click in the button save
    spyOn(component, 'onSubmit');
    let bt = fixture.debugElement.query(By.css('.btn-pm')).nativeElement;
    bt.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));


  
});
