import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicViewProfileComponent } from './dynamic-view-profile.component';

describe('DynamicViewProfileComponent', () => {
  let component: DynamicViewProfileComponent;
  let fixture: ComponentFixture<DynamicViewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicViewProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
