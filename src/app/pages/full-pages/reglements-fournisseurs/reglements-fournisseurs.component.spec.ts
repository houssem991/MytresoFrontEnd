import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementsFournisseursComponent } from './reglements-fournisseurs.component';

describe('ReglementsFournisseursComponent', () => {
  let component: ReglementsFournisseursComponent;
  let fixture: ComponentFixture<ReglementsFournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglementsFournisseursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReglementsFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
