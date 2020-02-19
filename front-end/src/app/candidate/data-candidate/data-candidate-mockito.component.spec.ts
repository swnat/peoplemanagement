import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataCandidateComponent } from './data-candidate.component';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CandidateService } from '../../service/candidate.service';
import { mockProvider, mockCandidate } from 'src/testing/mock-provider';
import { when, anyNumber } from 'ts-mockito';
import { of, Observable } from 'rxjs';
import {mock, instance, verify} from 'ts-mockito';
import { Candidate } from 'src/app/models/candidate';

/* El objetivo de este test suite es introducir los mocks de datos
   con la librería de ts-mockito */

describe('DataCandidateComponent', () => {
  let component: DataCandidateComponent;
  let fixture: ComponentFixture<DataCandidateComponent>;
  let mockedService: CandidateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule, BrowserAnimationsModule, ToastrModule.forRoot(), DatePickerModule ],
      declarations: [ DataCandidateComponent, HeaderComponent ],
      providers: [
        ToastrService,
        mockProvider(CandidateService, m => {
          when(m.getCandidate(anyNumber())).thenReturn(of(mockCandidate));
          mockedService=m;
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCandidateComponent);
    component = fixture.componentInstance;
    component.candidateId = 1; // set input
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show candidate data', () => {
    // const el: HTMLElement = fixture.nativeElement;
    expect(fixture.debugElement.query(By.css('#inputName')).nativeElement.value).toContain('Juan');
    expect(fixture.debugElement.query(By.css('#inputLastName')).nativeElement.value).toContain('Pérez');
  });

  it('data form should be valid', () => {
    expect(component.dataCandidateForm.valid).toBeTruthy();
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

  it('service call verification', async(()=>{
    verify(mockedService.getCandidate(anyNumber())).once();
  }));

});
