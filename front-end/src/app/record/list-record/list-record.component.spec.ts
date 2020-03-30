import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecordComponent } from './list-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

describe('ListRecordComponent', () => {
  let component: ListRecordComponent;
  let fixture: ComponentFixture<ListRecordComponent>;
  // LocalStorge variables
  const varStorage1 = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0Iiwic2NvcGVzIjoidXNlcjEiLCJpYXQiOjE1NzY1ODUzMjEsImV4cCI6MTU4MTYzMzMyMX0';
  const varStorage2 = '.xBqWVdg7W8rqT7dHihiUqstQq6p3bJzhPJS7N1hE5GQR3rh6UTYxbLv1F9Zbex1_Q6mEuJR579G8uoNkHEL7WQ';


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // tslint:disable-next-line: deprecation
      imports: [ToastrModule.forRoot(), HttpClientModule, RouterTestingModule, NgbModule.forRoot()],
      declarations: [ ListRecordComponent, HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('currentUser', JSON.stringify({'accessToken': varStorage1 + varStorage2,
     'tokenType': 'Bearer', 'id': '4', 'rol': 'user1'}));
    fixture = TestBed.createComponent(ListRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    // tslint:disable-next-line: no-shadowed-variable
    const fixture = TestBed.createComponent(ListRecordComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should get the data', () => {
    component.getAllRecord(0, 5);
    fixture.detectChanges();
    console.log(component.list_records);
    expect(component.list_records).toEqual([]);
  });

  it('show detail', () => {
    const fixture = TestBed.createComponent(ListRecordComponent);
    fixture.detectChanges();
   let labelName = fixture.debugElement.query(By.css('.form-control')).nativeElement;
    expect(labelName.textContent.trim()).toBe("No items to display!");
  });
});
