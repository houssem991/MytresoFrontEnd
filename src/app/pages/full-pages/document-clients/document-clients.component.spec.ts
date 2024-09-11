import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentClientsComponent } from './document-clients.component';

describe('DocumentClientsComponent', () => {
  let component: DocumentClientsComponent;
  let fixture: ComponentFixture<DocumentClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
