import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidateComponent } from './view-candidate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('ViewCandidateComponent', () => {
  let component: ViewCandidateComponent;
  let fixture: ComponentFixture<ViewCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule
        .withRoutes(
          [{ path: 'data/:id', component: ViewCandidateComponent },
          { path: 'candidate', component: ViewCandidateComponent }]), ToastrModule.forRoot()],
      declarations: [ ViewCandidateComponent,  HeaderComponent, DatePickerComponent ],
      providers: [ToastrService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCandidateComponent);
    component = fixture.componentInstance;
    localStorage.setItem('candidateId', JSON.stringify('{1}'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
