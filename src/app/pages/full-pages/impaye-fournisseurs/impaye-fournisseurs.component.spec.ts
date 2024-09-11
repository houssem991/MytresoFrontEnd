import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpayeFournisseursComponent } from './impaye-fournisseurs.component';

describe('ImpayeFournisseursComponent', () => {
  let component: ImpayeFournisseursComponent;
  let fixture: ComponentFixture<ImpayeFournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpayeFournisseursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpayeFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
