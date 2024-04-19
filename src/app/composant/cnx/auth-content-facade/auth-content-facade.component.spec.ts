import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthContentFacadeComponent } from './auth-content-facade.component';

describe('AuthContentFacadeComponent', () => {
  let component: AuthContentFacadeComponent;
  let fixture: ComponentFixture<AuthContentFacadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthContentFacadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthContentFacadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
