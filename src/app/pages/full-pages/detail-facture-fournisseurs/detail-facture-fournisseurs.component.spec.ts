import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFactureFournisseursComponent } from './detail-facture-fournisseurs.component';

describe('DetailFactureFournisseursComponent', () => {
  let component: DetailFactureFournisseursComponent;
  let fixture: ComponentFixture<DetailFactureFournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFactureFournisseursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailFactureFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
