import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInitialComponent } from './add-initial.component';

describe('AddInitialComponent', () => {
  let component: AddInitialComponent;
  let fixture: ComponentFixture<AddInitialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInitialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
