import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccessRoleComponent } from './update-access-role.component';

describe('UpdateAccessRoleComponent', () => {
  let component: UpdateAccessRoleComponent;
  let fixture: ComponentFixture<UpdateAccessRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAccessRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAccessRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
