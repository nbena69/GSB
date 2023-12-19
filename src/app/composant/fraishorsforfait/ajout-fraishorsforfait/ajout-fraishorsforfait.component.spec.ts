import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutFraishorsforfaitComponent } from './ajout-fraishorsforfait.component';

describe('AjoutFraishorsforfaitComponent', () => {
  let component: AjoutFraishorsforfaitComponent;
  let fixture: ComponentFixture<AjoutFraishorsforfaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutFraishorsforfaitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutFraishorsforfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
