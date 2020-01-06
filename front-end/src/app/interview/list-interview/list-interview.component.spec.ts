import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterviewComponent } from './list-interview.component';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('ListInterviewComponent', () => {
  let component: ListInterviewComponent;
  let fixture: ComponentFixture<ListInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule, ToastrModule.forRoot()],
      declarations: [ ListInterviewComponent, HeaderComponent, DialogComponent ],
      providers: [ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
