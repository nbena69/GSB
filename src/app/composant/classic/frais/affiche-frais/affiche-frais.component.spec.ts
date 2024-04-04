import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheFraisComponent } from './affiche-frais.component';

describe('AfficheFraisComponent', () => {
  let component: AfficheFraisComponent;
  let fixture: ComponentFixture<AfficheFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficheFraisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfficheFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
