import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecontactPopupComponent } from './recontact-popup.component';

describe('RecontactPopupComponent', () => {
  let component: RecontactPopupComponent;
  let fixture: ComponentFixture<RecontactPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecontactPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecontactPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
