import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRSComponent } from './add-rs.component';

describe('AddRSComponent', () => {
  let component: AddRSComponent;
  let fixture: ComponentFixture<AddRSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
