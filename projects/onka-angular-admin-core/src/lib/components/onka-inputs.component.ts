import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnkaFilterPass } from '../domain/onka/onka-filter-pass';
import { OnkaInputPass } from '../domain/onka/onka-input-pass';
import { OnkaService } from '../business/services/onka-service';

/**
 * Onka filter component
 */
@Component({
  selector: 'onka-filter',
  template: `
    <mat-form-field class="search-form-field">
      <input
        matInput
        [placeholder]="getLabel()"
        autocomplete="off"
        [formControl]="formControl"
        (onkaFilter)="pass.onSubmit()"
      />
      <button
        mat-button
        matSuffix
        mat-icon-button
        aria-label="Clear"
        *ngIf="formControl.value"
        (click)="onSearchClear()"
      >
        <mat-icon>close</mat-icon>
      </button>
      <ng-content></ng-content>
    </mat-form-field>
  `,
})
export class OnkaFilterComponent implements OnInit, AfterViewInit {
  constructor(
    public formControl: FormControl,
    public pass: OnkaFilterPass,
    public onkaService: OnkaService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  /**
   * Get translated label
   */
  getLabel() {
    return this.onkaService.getColumnLabel(
      this.pass.pageConfig,
      this.pass.column
    );
  }

  /**
   * Clear the input value
   */
  onSearchClear() {
    this.formControl.setValue('');
    this.pass.loadData();
  }
}

/**
 * Onka input component
 */
@Component({
  selector: 'onka-input',
  template: `
    <mat-form-field class="onka-input input-{{ pass.column.name }}">
      <input [formControl]="formControl" matInput [placeholder]="getLabel()" />
      <mat-error *ngIf="formControl.invalid">{{ getErrorMessage() }}</mat-error>
    </mat-form-field>
  `,
})
export class OnkaInputComponent implements OnInit, AfterViewInit {
  constructor(
    public formControl: FormControl,
    public pass: OnkaInputPass,
    public onkaService: OnkaService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  /**
   * Get translated label
   */
  getLabel() {
    return this.onkaService.getColumnLabel(
      this.pass.pageConfig,
      this.pass.column
    );
  }

  /**
   * Get error message
   */
  getErrorMessage() {
    for (const key in this.formControl.errors) {
      //console.log('validation', key, this.formControl.errors[key]);
      if (this.formControl.errors[key]) {
        return this.onkaService.translate(
          'onka.validation.' + key,
          key,
          this.formControl.errors[key]
        );
      }
    }
    return '';
  }
}

/**
 * Onka checkbox
 */
@Component({
  selector: 'onka-checkbox',
  template: `
    <div class="mat-form-field onka-input input-{{ pass.column.name }}">
      <mat-checkbox [formControl]="formControl">{{ getLabel() }}</mat-checkbox>
    </div>
  `,
})
export class OnkaCheckboxComponent extends OnkaInputComponent {
  constructor(
    public formControl: FormControl,
    public pass: OnkaInputPass,
    public onkaService: OnkaService
  ) {
    super(formControl, pass, onkaService);
  }
}

/**
 * Onka date
 */
@Component({
  selector: 'onka-date',
  template: `
    <mat-form-field class="onka-input input-{{ pass.column.name }}">
      <mat-label>{{ getLabel() }}</mat-label>
      <input matInput [matDatepicker]="picker" [formControl]="formControl" />
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      <mat-error *ngIf="formControl.invalid">{{ getErrorMessage() }}</mat-error>
    </mat-form-field>
  `,
})
export class OnkaDateComponent extends OnkaInputComponent {
  constructor(
    public formControl: FormControl,
    public pass: OnkaInputPass,
    public onkaService: OnkaService
  ) {
    super(formControl, pass, onkaService);
  }
}

/**
 * Onka textarea
 */
@Component({
  selector: 'onka-textarea',
  template: `
    <mat-form-field class="onka-input input-{{ pass.column.name }}">
      <textarea
        [formControl]="formControl"
        matInput
        [placeholder]="getLabel()"
      ></textarea>
      <mat-error *ngIf="formControl.invalid">{{ getErrorMessage() }}</mat-error>
    </mat-form-field>
  `,
})
export class OnkaTextareaComponent extends OnkaInputComponent {
  constructor(
    public formControl: FormControl,
    public pass: OnkaInputPass,
    public onkaService: OnkaService
  ) {
    super(formControl, pass, onkaService);
  }
}

/**
 * Onka dropdown component
 */
@Component({
  selector: 'onka-select',
  template: `
    <mat-form-field class="onka-input input-{{ pass.column.name }}">
      <mat-label>{{ getLabel() }}</mat-label>
      <mat-select [formControl]="formControl">
        <mat-option *ngFor="let item of items" [value]="item.key">
          {{ item.label }}
        </mat-option>
      </mat-select>
      <mat-error *ngIf="formControl.invalid">{{ getErrorMessage() }}</mat-error>
    </mat-form-field>
  `,
})
export class OnkaSelectComponent extends OnkaInputComponent {
  /**
   * Items to display
   */
  @Input() items: { key: string; label: any }[];

  constructor(
    public formControl: FormControl,
    public pass: OnkaInputPass,
    public onkaService: OnkaService
  ) {
    super(formControl, pass, onkaService);
    if (pass.column.enum) {
      this.items = Object.keys(pass.column.enum).map((x) => ({
        key: pass.column.enum[x],
        label: onkaService.translatEnumKey(pass.column.enumName, x),
      }));
    }
  }
}

/**
 * Onka slide toggle
 */
@Component({
  selector: 'onka-slide-toggle',
  template: `
    <div class="onka-input input-{{ pass.column.name }}">
      <mat-slide-toggle [formControl]="formControl">{{
        getLabel()
      }}</mat-slide-toggle>
    </div>
  `,
})
export class OnkaSlideToggleComponent extends OnkaInputComponent {
  constructor(
    public formControl: FormControl,
    public pass: OnkaInputPass,
    public onkaService: OnkaService
  ) {
    super(formControl, pass, onkaService);
  }
}

/**
 * Onka number input component
 */
@Component({
  selector: 'onka-number',
  template: `
    <mat-form-field class="onka-input input-{{ pass.column.name }}">
      <mat-label>{{ getLabel() }}</mat-label>
      <input matInput [formControl]="formControl" type="number" />
      <mat-error *ngIf="formControl.invalid">{{ getErrorMessage() }}</mat-error>
    </mat-form-field>
  `,
})
export class OnkaNumberComponent extends OnkaInputComponent {
  constructor(
    public formControl: FormControl,
    public pass: OnkaInputPass,
    public onkaService: OnkaService
  ) {
    super(formControl, pass, onkaService);
  }
}

export const allInputs = {
  OnkaFilterComponent,
  OnkaInputComponent,
  OnkaCheckboxComponent,
  OnkaDateComponent,
  OnkaTextareaComponent,
  OnkaSelectComponent,
  OnkaSlideToggleComponent,
  OnkaNumberComponent,
};
