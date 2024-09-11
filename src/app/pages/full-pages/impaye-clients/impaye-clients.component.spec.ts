import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpayeClientsComponent } from './impaye-clients.component';

describe('ImpayeClientsComponent', () => {
  let component: ImpayeClientsComponent;
  let fixture: ComponentFixture<ImpayeClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpayeClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpayeClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
