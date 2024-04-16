import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionrolesComponent } from './gestionroles.component';

describe('GestionrolesComponent', () => {
  let component: GestionrolesComponent;
  let fixture: ComponentFixture<GestionrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionrolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
