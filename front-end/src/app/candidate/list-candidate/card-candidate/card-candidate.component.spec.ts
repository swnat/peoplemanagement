import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CardCandidateComponent } from './card-candidate.component';
import { Candidate } from 'src/app/models/candidate';

describe('CardCandidateComponent', () => {
  let component: CardCandidateComponent;
  let fixture: ComponentFixture<CardCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ CardCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCandidateComponent);
    component = fixture.componentInstance;
    component.candidate = { id: 1, name: 'John', lastName: 'Doe', process_challenge_status: 'PENDING',
        interviewStatus: 'PENDING', } as Candidate;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show candidate data', () => {
    const cardElement: HTMLElement = fixture.nativeElement;
    expect(cardElement.textContent).toContain('John');
    expect(cardElement.textContent).toContain(component.statusChallenge);
    expect(cardElement.textContent).toContain(component.statusInterview);
  });
});
