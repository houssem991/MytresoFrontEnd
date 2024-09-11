import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsFournisseursComponent } from './documents-fournisseurs.component';

describe('DocumentsFournisseursComponent', () => {
  let component: DocumentsFournisseursComponent;
  let fixture: ComponentFixture<DocumentsFournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsFournisseursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
