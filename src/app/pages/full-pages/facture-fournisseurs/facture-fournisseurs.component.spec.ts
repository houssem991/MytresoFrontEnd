import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureFournisseursComponent } from './facture-fournisseurs.component';

describe('FactureFournisseursComponent', () => {
  let component: FactureFournisseursComponent;
  let fixture: ComponentFixture<FactureFournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureFournisseursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
