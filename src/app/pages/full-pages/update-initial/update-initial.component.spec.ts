import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInitialComponent } from './update-initial.component';

describe('UpdateInitialComponent', () => {
  let component: UpdateInitialComponent;
  let fixture: ComponentFixture<UpdateInitialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInitialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
