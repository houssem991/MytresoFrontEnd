import { Component, EventEmitter, Output, OnInit, AfterViewInit, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-range-filter',
  template: `
    <form [formGroup]="form">
      <input type="date" formControlName="fromDate" (change)="onDateChange()" />
      <input type="date" formControlName="toDate" (change)="onDateChange()" />
    </form>
  `,
})
export class DateRangeFilterComponent implements OnInit, AfterViewInit, OnDestroy {
  form: FormGroup;
  @Output() filter: EventEmitter<any> = new EventEmitter<any>();
  formChangesSubscription: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fromDate: [null],
      toDate: [null],
    });
  }

  ngAfterViewInit(): void {
    this.formChangesSubscription = this.form.valueChanges.subscribe((value) => {
      this.filter.emit(value);
    });
  }

  ngOnDestroy(): void {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }

  onDateChange(): void {
    console.log('Date range changed', this.form.value);
    this.filter.emit(this.form.value);
  }
}
