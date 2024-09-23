import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementBanqueComponent } from './mouvement-banque.component';

describe('MouvementBanqueComponent', () => {
  let component: MouvementBanqueComponent;
  let fixture: ComponentFixture<MouvementBanqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MouvementBanqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MouvementBanqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
