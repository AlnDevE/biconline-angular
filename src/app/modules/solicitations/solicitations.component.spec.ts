import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationsComponent } from './solicitations.component';

describe('SolicitationsComponent', () => {
  let component: SolicitationsComponent;
  let fixture: ComponentFixture<SolicitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
