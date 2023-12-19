import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheFraishorsforfaitComponent } from './affiche-fraishorsforfait.component';

describe('AfficheFraishorsforfaitComponent', () => {
  let component: AfficheFraishorsforfaitComponent;
  let fixture: ComponentFixture<AfficheFraishorsforfaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficheFraishorsforfaitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfficheFraishorsforfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
