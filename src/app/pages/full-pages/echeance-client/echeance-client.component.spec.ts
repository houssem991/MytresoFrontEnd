import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcheanceClientComponent } from './echeance-client.component';

describe('EcheanceClientComponent', () => {
  let component: EcheanceClientComponent;
  let fixture: ComponentFixture<EcheanceClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcheanceClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcheanceClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
