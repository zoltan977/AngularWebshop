import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserAccountDataComponent } from './display-user-account-data.component';

describe('DisplayUserAccountDataComponent', () => {
  let component: DisplayUserAccountDataComponent;
  let fixture: ComponentFixture<DisplayUserAccountDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayUserAccountDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayUserAccountDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
