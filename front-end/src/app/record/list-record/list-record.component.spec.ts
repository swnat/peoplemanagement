import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecordComponent } from './list-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

describe('ListRecordComponent', () => {
  let component: ListRecordComponent;
  let fixture: ComponentFixture<ListRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientModule, RouterTestingModule, NgbModule.forRoot()],
      declarations: [ ListRecordComponent, HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('currentUser', JSON.stringify({"accessToken":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0Iiwic2NvcGVzIjoidXNlcjEiLCJpYXQiOjE1NzY1ODUzMjEsImV4cCI6MTU4MTYzMzMyMX0.xBqWVdg7W8rqT7dHihiUqstQq6p3bJzhPJS7N1hE5GQR3rh6UTYxbLv1F9Zbex1_Q6mEuJR579G8uoNkHEL7WQ","tokenType":"Bearer","id":"4","rol":"user1"})); 
    fixture = TestBed.createComponent(ListRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    const fixture = TestBed.createComponent(ListRecordComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should get the data', () => {
    component.getAllRecord(0,5);
    fixture.detectChanges();
    console.log(component.list_records);    
    expect(component.list_records).toEqual([]);
  });
});
