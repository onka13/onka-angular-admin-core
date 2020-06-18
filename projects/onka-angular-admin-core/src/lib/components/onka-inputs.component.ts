import {
  Component,
  OnInit,
  AfterViewInit,
  InjectionToken,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnkaFilterPass } from '../domain/onka/onka-filter-pass';
import { OnkaInputPass } from '../domain/onka/onka-input-pass';
import { OnkaService } from '../business/services/onka-service';

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

  getLabel() {
    return this.onkaService.getColumnLabel(
      this.pass.pageConfig,
      this.pass.column
    );
  }

  onSearchClear() {
    this.formControl.setValue('');
    this.pass.loadData();
  }
}

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

  getLabel() {
    return this.onkaService.getColumnLabel(
      this.pass.pageConfig,
      this.pass.column
    );
  }

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

@Component({
  selector: 'onka-checkbox',
  template: `
    <div class="mat-form-field onka-input input-{{ pass.column.name }}">
      <div class="mat-form-field-flex">
        <div class="mat-form-field-infix">
          <mat-checkbox [formControl]="formControl">{{
            getLabel()
          }}</mat-checkbox>
        </div>
      </div>
      <div class="mat-form-field-subscript-wrapper">
        <mat-error *ngIf="formControl.invalid">{{
          getErrorMessage()
        }}</mat-error>
      </div>
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
  getCheckBoxError() {
    if (this.formControl.touched) {
      return this.formControl.invalid;
    }
    return false;
  }
}

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
