import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementsClientsComponent } from './reglements-clients.component';

describe('ReglementsClientsComponent', () => {
  let component: ReglementsClientsComponent;
  let fixture: ComponentFixture<ReglementsClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglementsClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReglementsClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
