import {
    async, ComponentFixture, TestBed, fakeAsync, tick
} from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { newEvent } from 'src/testing';
import { DataRequest } from 'src/app/models/data-request';
import { SafeHtmlPipe } from '../safe-html-pipe/safe-html';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

const CANDIDATES = {
    'content': [{
        'id': 2,
        'name': 'Jose',
        'lastName': 'Balbuena',
        'interviewStatus': 'IN PROCESS',
        'nameCandidate': 'Jose Balbuena'
    }, {
        'id': 3,
        'name': 'Mauri',
        'lastName': 'Macri',
        'interviewStatus': 'IN PROCESS',
        'nameCandidate': 'Mauri Macri'
    }, {
        'id': 4,
        'name': 'Laura',
        'lastName': 'Riquelme',
        'interviewStatus': 'PENDING',
        'nameCandidate': 'Laura Riquelme'
    }, {
        'id': 1,
        'name': 'Liz',
        'lastName': 'Torres',
        'interviewStatus': 'PENDING',
        'nameCandidate': 'Liz Torres'
    },
    {
        'id': 5,
        'name': 'María',
        'lastName': 'Paredes',
        'interviewStatus': 'PENDING',
        'nameCandidate': 'María Paredes'
    }],
    'totalCount': 10
};

let comp: DataTableComponent;
let fixture: ComponentFixture<DataTableComponent>;
let page: Page;

/////// Tests //////
describe('DataTableComponent', () => {
    const varStorage1 = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0Iiwic2NvcGVzIjoidXNlcjEiLCJpYXQiOjE1NzY1ODUzMjEsImV4cCI6MTU4MTYzMzMyMX0';
    const varStorage2 = '.xBqWVdg7W8rqT7dHihiUqstQq6p3bJzhPJS7N1hE5GQR3rh6UTYxbLv1F9Zbex1_Q6mEuJR579G8uoNkHEL7WQ';

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            // tslint:disable-next-line: deprecation
            imports: [NgbModule.forRoot(), MultiSelectModule],
            declarations: [DataTableComponent, SafeHtmlPipe],
            providers: [NgbPaginationConfig]
        }).compileComponents();
    }));


    describe('when navigate to existing user', () => {
        beforeEach(async(() => {
            localStorage.setItem('currentUser', JSON.stringify({ 'accessToken': varStorage1 + varStorage2,
             'tokenType': 'Bearer', 'id': '4', 'rol': 'user1' }));
            createComponent();
        }));

        it('1st candidate should match 1st test candidate', () => {
            const expectedCandidate = CANDIDATES.content[0];
            expect(page.candidateRows[0][0].textContent).toContain(expectedCandidate.name, 'candidate.name');
            expect(page.candidateRows[0][1].textContent).toContain(expectedCandidate.lastName, 'candidate.lastName');
            expect(page.candidateRows[0][2].textContent).toContain(expectedCandidate.interviewStatus, 'candidate.interviewStatus');
        });
    });

});

/////////// Helpers /////
class Page {
    candidateRows: HTMLLIElement[][];
    paginationButton: HTMLLIElement;

    constructor() {
        const candidateRowNodes = fixture.nativeElement.querySelector('tbody').querySelectorAll('tr');
        this.candidateRows = new Array();
        for (let i = 0; candidateRowNodes.length > 0; i++) {
            if (candidateRowNodes[i]) {
                this.candidateRows[i] = Array.from(candidateRowNodes[i].querySelectorAll('td'));
            } else {
                break;
            }
        }
        this.paginationButton = fixture.nativeElement.querySelectorAll('.page-link')[3];
    }
}
function getAllData(request: DataRequest) {
    this.comp.rowItems = CANDIDATES;
}

function createComponent() {
    fixture = TestBed.createComponent(DataTableComponent);
    comp = fixture.componentInstance;
    comp.rowItems = CANDIDATES;
    comp.rowSettings = [{
     label: 'Name',
     isAction: false,
     key: 'name',
    }, {
        label: 'Last Name',
        isAction: false,
        key: 'lastName'
    }, {
        label: 'Interviews Status',
        isAction: false,
        key: 'interviewStatus'
    }];
    comp.showFilter = true;
    comp.showPagination = true;
    comp.filteringFields = { text: 'nameCandidate', value: 'nameCandidate' };
    comp.getAllData.subscribe(
        (request: DataRequest) => {
            getAllData(request);
        });
    // tslint:disable-next-line: no-unused-expression
    comp.filteringFields;
    fixture.detectChanges();

    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page = new Page();
    });
}

