import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviterCollaborateurComponent } from './inviter-collaborateur.component';

describe('InviterCollaborateurComponent', () => {
  let component: InviterCollaborateurComponent;
  let fixture: ComponentFixture<InviterCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviterCollaborateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviterCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
