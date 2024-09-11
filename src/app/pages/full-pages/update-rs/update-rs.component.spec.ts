import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRSComponent } from './update-rs.component';

describe('UpdateRSComponent', () => {
  let component: UpdateRSComponent;
  let fixture: ComponentFixture<UpdateRSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
