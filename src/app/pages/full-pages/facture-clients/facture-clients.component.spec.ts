import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureClientsComponent } from './facture-clients.component';

describe('FactureClientsComponent', () => {
  let component: FactureClientsComponent;
  let fixture: ComponentFixture<FactureClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
