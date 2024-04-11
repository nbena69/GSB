import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAffectationPopupComponent } from './update-affectation-popup.component';

describe('UpdateAffectationPopupComponent', () => {
  let component: UpdateAffectationPopupComponent;
  let fixture: ComponentFixture<UpdateAffectationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAffectationPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAffectationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
