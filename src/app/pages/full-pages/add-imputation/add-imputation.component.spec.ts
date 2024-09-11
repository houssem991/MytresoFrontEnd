import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImputationComponent } from './add-imputation.component';

describe('AddImputationComponent', () => {
  let component: AddImputationComponent;
  let fixture: ComponentFixture<AddImputationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImputationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImputationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
