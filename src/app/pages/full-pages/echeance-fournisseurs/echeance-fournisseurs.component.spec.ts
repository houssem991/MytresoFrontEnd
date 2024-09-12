import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcheanceFournisseursComponent } from './echeance-fournisseurs.component';

describe('EcheanceFournisseursComponent', () => {
  let component: EcheanceFournisseursComponent;
  let fixture: ComponentFixture<EcheanceFournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcheanceFournisseursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcheanceFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
