import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute, ActivatedRouteStub } from '../../../testing';
import { User } from 'src/app/models/user';
import { ViewUserComponent } from './view-user.component';
import { UserService } from 'src/app/service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/shared/notification-service/notification.service';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let component: ViewUserComponent;
let fixture: ComponentFixture<ViewUserComponent>;
let page: Page;

////// Tests //////
const firstUser: User = {
    name: 'Elena',
    lastname: 'Coronel',
    email: 'elena@softwarenatura.com',
    active: true,
    rol: 'user1',
    phoneNumber: '',
    idUser: 4,
};

describe('ViewUserComponent', () => {
    beforeEach(() => {
        activatedRoute = new ActivatedRouteStub();
    });

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [ToastrModule.forRoot(), HttpClientModule, RouterTestingModule, NgbModule.forRoot()],
            declarations: [ViewUserComponent, HeaderComponent],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRoute },
                { provide: UserService, useClass: UserService },
                { provide: NotificationService, useClass: NotificationService },
            ]
        })
            .compileComponents();
    })); 
    describe('when navigate to existing user', () => {
        let expectedUser: User;
        let rol_name: String;

        beforeEach(async(() => {
            expectedUser = firstUser;
            rol_name = 'Manager';
            activatedRoute.setParamMap({ id: expectedUser.idUser });
            localStorage.setItem('currentUser', JSON.stringify({ "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0Iiwic2NvcGVzIjoidXNlcjEiLCJpYXQiOjE1NzY1ODUzMjEsImV4cCI6MTU4MTYzMzMyMX0.xBqWVdg7W8rqT7dHihiUqstQq6p3bJzhPJS7N1hE5GQR3rh6UTYxbLv1F9Zbex1_Q6mEuJR579G8uoNkHEL7WQ", "tokenType": "Bearer", "id": "4", "rol": "user1" }));
            createComponent();
        }));

        it('should display that user\'s attributes', () => {
            expect(page.nameDisplay.textContent).toBe(expectedUser.name);
            expect(page.lastnameDisplay.textContent).toBe(expectedUser.lastname);
            expect(page.emailDisplay.textContent).toBe(expectedUser.email);
            expect(page.phoneNumberDisplay.textContent).toBe(expectedUser.phoneNumber);
            expect(page.rolDisplay.textContent).toBe(rol_name);
        });
    });

});

/////////// Helpers /////
async function createComponent() {
    
    fixture = TestBed.createComponent(ViewUserComponent);

    component = fixture.componentInstance;
    page = new Page(fixture);

    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
    });
}

class Page {
    get nameDisplay() { return this.query<HTMLElement>('#nameId'); }
    get lastnameDisplay() { return this.query<HTMLElement>('#lastnameId'); }
    get phoneNumberDisplay() { return this.query<HTMLElement>('#phoneNumberId'); }
    get emailDisplay() { return this.query<HTMLElement>('#emailId'); }
    get rolDisplay() { return this.query<HTMLElement>('#rolId'); }

    navigateSpy: jasmine.Spy;

    constructor(fixture: ComponentFixture<ViewUserComponent>) {
        const routerSpy = <any>fixture.debugElement.injector.get(Router);
        this.navigateSpy = routerSpy.navigate;
        const component = fixture.componentInstance;
    }

    private query<T>(selector: string): T {
        return fixture.nativeElement.querySelector(selector);
    }

}
