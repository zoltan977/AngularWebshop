import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormFieldComponent } from './mat-form-field.component';

describe('MatFormFieldComponent', () => {
  let component: MatFormFieldComponent;
  let fixture: ComponentFixture<MatFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatFormFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
