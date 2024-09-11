import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageRsComponent } from './parametrage-rs.component';

describe('ParametrageRsComponent', () => {
  let component: ParametrageRsComponent;
  let fixture: ComponentFixture<ParametrageRsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrageRsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrageRsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
