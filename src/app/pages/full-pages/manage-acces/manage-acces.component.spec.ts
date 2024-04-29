import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccesComponent } from './manage-acces.component';

describe('ManageAccesComponent', () => {
  let component: ManageAccesComponent;
  let fixture: ComponentFixture<ManageAccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAccesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
