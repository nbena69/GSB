import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVisiteurPopupComponent } from './update-visiteur-popup.component';

describe('UpdateVisiteurPopupComponent', () => {
  let component: UpdateVisiteurPopupComponent;
  let fixture: ComponentFixture<UpdateVisiteurPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVisiteurPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateVisiteurPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
