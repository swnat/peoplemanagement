import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ListCandidateComponent } from './list-candidate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DataRequest } from 'src/app/models/data-request';
import { ResponseList } from 'src/app/models/responseList';

describe('ListCandidateComponent', () => {
  let component: ListCandidateComponent;
  let fixture: ComponentFixture<ListCandidateComponent>;
  let data: DataRequest;
  let listR: ResponseList;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [ ListCandidateComponent, HeaderComponent],
      providers: [ToastrService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCandidateComponent);
    component = fixture.componentInstance;
    localStorage.setItem('statusCandidate', JSON.stringify('{"id":4,"name":"Interview Team"}'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('call to add function', async(() => {
    spyOn(component, 'toViewCandidateAdd');
    const bt = fixture.debugElement.query(By.css('.btn-lg')).nativeElement;
    bt.click();
    expect(component.toViewCandidateAdd).toHaveBeenCalledTimes(1);

  }));
  
  it('redirect on add candidate', () => {
    const bt = fixture.debugElement.query(By.css('.btn-lg')).nativeElement;
    bt.click();
    fixture.whenStable().then(() => {
      setTimeout(() => {fixture.detectChanges();
      TestBed.get(Router).url;
      expect(TestBed.get(Router).url).toBe('/candidate/data');
    });
  });
  });
});
