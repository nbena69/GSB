import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVisiteurComponent } from './search-visiteur.component';

describe('SearchVisiteurComponent', () => {
  let component: SearchVisiteurComponent;
  let fixture: ComponentFixture<SearchVisiteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchVisiteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchVisiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
