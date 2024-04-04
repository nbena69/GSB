import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFraishorsforfaitComponent } from './liste-fraishorsforfait.component';

describe('ListeFraishorsforfaitComponent', () => {
  let component: ListeFraishorsforfaitComponent;
  let fixture: ComponentFixture<ListeFraishorsforfaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeFraishorsforfaitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeFraishorsforfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
