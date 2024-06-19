import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccesstoRoleComponent } from './add-accessto-role.component';

describe('AddAccesstoRoleComponent', () => {
  let component: AddAccesstoRoleComponent;
  let fixture: ComponentFixture<AddAccesstoRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAccesstoRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccesstoRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
