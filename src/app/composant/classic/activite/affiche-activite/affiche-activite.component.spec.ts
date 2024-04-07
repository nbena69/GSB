import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheActiviteComponent } from './affiche-activite.component';

describe('AfficheActiviteComponent', () => {
  let component: AfficheActiviteComponent;
  let fixture: ComponentFixture<AfficheActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficheActiviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfficheActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
