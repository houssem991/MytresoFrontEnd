import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateImputationComponent } from './update-imputation.component';

describe('UpdateImputationComponent', () => {
  let component: UpdateImputationComponent;
  let fixture: ComponentFixture<UpdateImputationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateImputationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateImputationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
