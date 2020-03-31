import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionSiteComponent } from './construction-site.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ConstructionSiteComponent', () => {
  let component: ConstructionSiteComponent;
  let fixture: ComponentFixture<ConstructionSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructionSiteComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
