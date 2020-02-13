import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCandidateComponent } from './card-candidate.component';

describe('CardCandidateComponent', () => {
  let component: CardCandidateComponent;
  let fixture: ComponentFixture<CardCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
