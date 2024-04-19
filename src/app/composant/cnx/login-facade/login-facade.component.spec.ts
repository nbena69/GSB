import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFacadeComponent } from './login-facade.component';

describe('LoginComponent', () => {
  let component: LoginFacadeComponent;
  let fixture: ComponentFixture<LoginFacadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFacadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFacadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
