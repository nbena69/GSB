import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutFraisComponent } from './ajout-frais.component';

describe('AjoutFraisComponent', () => {
  let component: AjoutFraisComponent;
  let fixture: ComponentFixture<AjoutFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutFraisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
