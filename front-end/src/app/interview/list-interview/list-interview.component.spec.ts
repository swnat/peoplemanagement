import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterviewComponent } from './list-interview.component';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';


describe('ListInterviewComponent', () => {
  let component: ListInterviewComponent;
  let fixture: ComponentFixture<ListInterviewComponent>;
  let masterService: NotificationService;
  let valueServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('ToastrService', ['info']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientModule, ToastrModule.forRoot()],
      declarations: [ ListInterviewComponent, HeaderComponent, DialogComponent ],
      providers: [ToastrService, NotificationService,
                                  { provide: ToastrService, useValue: spy}
                ]
    })
    .compileComponents();
    masterService = TestBed.get(NotificationService);
    valueServiceSpy = TestBed.get(ToastrService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('if the required fields are completed, it can be saved', async(() => {
    localStorage.setItem('statusCandidate', JSON.stringify('{"id":1,"name":"Interview Scrum Masters"}'));
    spyOn(component, 'toAddInterview');
    const bt = fixture.debugElement.query(By.css('.btn')).nativeElement;
    bt.click();
    expect(component.toAddInterview).toHaveBeenCalledTimes(1);
    fixture.whenStable().then(() => {
      setTimeout(() => {fixture.detectChanges();
      // tslint:disable-next-line: no-unused-expression
      TestBed.get(Router).url;
      expect(component.submitted).toBeTruthy();
      expect(TestBed.get(Router).url).toBe('/interview/add-interview/');
    });
    });

  }));
  it('If an interview is not chosen, then notify', async(() => {
    const bt = fixture.debugElement.query(By.css('.btn')).nativeElement;
    bt.click();
    expect(valueServiceSpy.info.calls.count())
    .toBe(1, 'spy method was called once');
  }));

});
