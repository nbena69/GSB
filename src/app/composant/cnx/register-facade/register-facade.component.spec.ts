import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFacadeComponent } from './register-facade.component';

describe('RegisterComponent', () => {
  let component: RegisterFacadeComponent;
  let fixture: ComponentFixture<RegisterFacadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFacadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFacadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
