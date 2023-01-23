import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAccountItemFormComponent } from './add-user-account-item-form.component';

describe('AddUserAccountItemFormComponent', () => {
  let component: AddUserAccountItemFormComponent;
  let fixture: ComponentFixture<AddUserAccountItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserAccountItemFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserAccountItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
