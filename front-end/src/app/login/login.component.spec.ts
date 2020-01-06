import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../shared/layout/header/header.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '../service/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


class MockError{
  public error: {code: number, message: string};

  submitLogin(){

    return this.error;
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service:  MockError; 
  beforeEach(async(() => {
   
    service = new MockError();
    TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        BrowserAnimationsModule, 
        ReactiveFormsModule, 
        HttpClientModule, 
        RouterTestingModule.withRoutes([{path:'login',component:LoginComponent},
        {path:'',component:LoginComponent},{path:'**',redirectTo:'/login',pathMatch:'full'}]),
        FormsModule, ],
      declarations: [ LoginComponent,  HeaderComponent],
    })
    .compileComponents().then(() => {
      spyOn(TestBed.get(AuthenticationService),'login').and.callThrough();
      fixture = TestBed.createComponent(LoginComponent);
      TestBed.get(Router).initialNavigation();
      component = fixture.componentInstance;
      
    });
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('You should change the login URL to candidate', async(() => {
    component.ngOnInit();
    fixture.detectChanges();
    component.loginForm.controls['email'].setValue('elena@softwarenatura.com');
    component.loginForm.controls['password'].setValue('usaToday1!');
    let bt = fixture.debugElement.nativeElement.querySelector('button');
    bt.click();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{ 
      setTimeout(()=>{fixture.detectChanges();
      TestBed.get(Router).url;
      expect(component.submitted).toBeTruthy();
      expect(TestBed.get(Router).url).toBe('/');
    })
    })
  }));

  it('It should show error message requesting to complete the fields', async(() => {
    component.ngOnInit();
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    fixture.detectChanges();
    let bt = fixture.debugElement.nativeElement.querySelector('button');
    bt.click();
    fixture.detectChanges();
    let hint1 = fixture.debugElement.query(By.css('#hint-email'));
    spyOn(component, 'submitLogin').and.returnValue(false);
    expect(hint1).toBeTruthy();
  }));

  it ('You should show error message requesting to complete the mail field', async(() => {
    component.ngOnInit();
    component.loginForm.controls['email'].setValue('');
    fixture.detectChanges();
    component.loginForm.controls['password'].setValue('usaToday1!');
    let bt = fixture.debugElement.query(By.css('button')).nativeElement;
    bt.click();
    fixture.detectChanges();
    let hint3 = fixture.debugElement.query(By.css('#hint-email'));
    spyOn(component, 'submitLogin').and.returnValue(false);
    expect(hint3).toBeTruthy();
  }));

  it('It should show error message requesting to complete the password field', async(() => {
    component.ngOnInit();
    component.loginForm.controls['password'].setValue('');
    fixture.detectChanges();
    component.loginForm.controls['email'].setValue('elena@softwarenatura.com');
    let bt = fixture.debugElement.query(By.css('button')).nativeElement;
    bt.click();
    fixture.detectChanges();
    let hint4 = fixture.debugElement.query(By.css('#hint-pass'));
    spyOn(component, 'submitLogin').and.returnValue(false);
    expect(hint4).toBeTruthy();
  }));
});