import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { OnkaFilterPass } from '../domain/onka/onka-filter-pass';
import { OnkaInputPass } from '../domain/onka/onka-input-pass';
import { OnkaService } from '../business/services/onka-service';
import { ApiBusinessLogic } from '../business/services/api-business-logic';
import { Observable, fromEvent } from 'rxjs';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { OnkaOption } from '../domain/onka/onka-types';
import { ApiSearchRequest } from '../domain/api/api-request';
import { OnkaReference } from '../domain/onka/onka-reference';
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';

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
  @Input() items: OnkaOption[];

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

/**
 * Onka multi reference component
 */
@Component({
  selector: 'onka-multi-reference',
  template: `
    <mat-form-field class="onka-input input-{{ pass.column.name }}">
      <mat-label>{{ getLabel() }}</mat-label>
      <mat-chip-list #chipList aria-label="selection">
        <mat-chip *ngFor="let item of getChips()" [selectable]="selectable" [removable]="removable" (removed)="remove(item)">
          {{ item.label }}
          <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
        </mat-chip>
        <input
          #input
          [formControl]="inputFormControl"
          [matAutocomplete]="auto"
          [matChipInputFor]="chipList"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          (matChipInputTokenEnd)="add($event)"
        />
      </mat-chip-list>
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
        <mat-option *ngFor="let item of filteredItems" [value]="item.key">
          {{ item.label }}
        </mat-option>
      </mat-autocomplete>
      <mat-error *ngIf="formControl.invalid">{{ getErrorMessage() }}</mat-error>
    </mat-form-field>
  `,
})
export class OnkaMultiReferenceComponent extends OnkaInputComponent implements OnInit, AfterViewInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  inputFormControl = new FormControl();
  filteredItems: OnkaOption[];

  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  _reference: OnkaReference;
  _loadData = true;

  constructor(public formControl: FormControl, public pass: OnkaInputPass, public onkaService: OnkaService, private apiBusiness: ApiBusinessLogic) {
    super(formControl, pass, onkaService);
    this._reference = this.pass.column.reference;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this._loadData = true;
          this.loadData();
        }),
      )
      .subscribe();

    fromEvent(this.input.nativeElement, 'focus')
      .pipe(tap(() => this.loadData()))
      .subscribe();
  }

  getChips() {
    return this.formControl.value;
  }

  loadData() {
    console.log('loadData', this._loadData, this.inputFormControl.value);

    if (!this._loadData) return;
    this._loadData = false;
    var _request = new ApiSearchRequest();
    _request.pagination.page = 1;
    _request.pagination.perPage = this._reference.pageSize;
    _request.sort.field = this._reference.sortField;
    _request.sort.order = (this._reference.sortDirection || 'asc').toUpperCase();
    _request.filter[this._reference.filterField] = this.inputFormControl.value;
    return this.apiBusiness.search(this.pass.column.reference.reference, _request).subscribe((data) => {
      this.filteredItems = data.value
        .filter((x) => {
          return this.getChips().filter((y) => y.key == x.id).length == 0;
        })
        .map((x) => {
          var option: OnkaOption = {
            key: x.id,
            label: x.name,
          };
          return option;
        });
    });
  }

  add(event: MatChipInputEvent): void {
    //console.log('val', this.formControl.value);
  }

  remove(item: OnkaOption): void {
    const index = this.getChips().indexOf(item);
    if (index >= 0) {
      this.getChips().splice(index, 1);
      this._loadData = true;
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('selected', event.option.value, event.option.viewValue, this.inputFormControl.value);
    this.getChips().push({
      key: event.option.value,
      label: event.option.viewValue,
    });
    this.input.nativeElement.value = '';
    this.inputFormControl.setValue(null);
    this.input.nativeElement.blur();    
    this._loadData = true;
  }
}

/**
 * Reference component
 */
@Component({
  selector: 'onka-reference',
  template: `
    <mat-form-field class="onka-input input-{{ pass.column.name }}">
      <mat-label>{{ getLabel() }}</mat-label>
      <input #input matInput [formControl]="inputFormControl" [matAutocomplete]="auto"/>
      <button mat-button matSuffix mat-icon-button aria-label="Clear" *ngIf="isClearable()" (click)="onClear($event)">
        <mat-icon>close</mat-icon>
      </button>
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
        <mat-option *ngFor="let item of filteredItems" [value]="item.key">
          {{ item.label }}
        </mat-option>
      </mat-autocomplete>
      <mat-error *ngIf="formControl.invalid">{{ getErrorMessage() }}</mat-error>
    </mat-form-field>
  `,
})
export class OnkaReferenceComponent extends OnkaInputComponent implements OnInit, AfterViewInit {
  inputFormControl = new FormControl();
  filteredItems: OnkaOption[];

  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;

  _reference: OnkaReference;

  _selectedText = '';

  constructor(public formControl: FormControl, public pass: OnkaInputPass, public onkaService: OnkaService, private apiBusiness: ApiBusinessLogic) {
    super(formControl, pass, onkaService);
    this._reference = this.pass.column.reference;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.inputFormControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          console.log('AAA valueChanges');
          this.loadData();
        }),
      )
      .subscribe();
    fromEvent(this.input.nativeElement, 'focus')
      .pipe(tap(() => this.loadData()))
      .subscribe();
    fromEvent(this.input.nativeElement, 'blur')
      .pipe(tap(() => this.onBlur()))
      .subscribe();
  }

  onBlur() {
    // if (this.pass.column.isCreatable && !this.inputFormControl.value) {
    //   this._selectedText = '';
    //   return;
    // }
    if (this.inputFormControl.value != this._selectedText) {
      this.inputFormControl.setValue(this._selectedText, {});
    }
  }

  isClearable() {
    return this.pass.column.isCreatable && this.inputFormControl.value;
  }

  onClear(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.formControl.setValue('');
    this._selectedText = '';
    this.inputFormControl.setValue(null, {}); // set null to load data next
  }

  loadData() {
    if(this.inputFormControl.value != null && this.inputFormControl.value == this._selectedText) return;
    if (this.input.nativeElement != document.activeElement) return;
    var request = new ApiSearchRequest();
    request.pagination.page = 1;
    request.pagination.perPage = this._reference.pageSize;
    request.sort.field = this._reference.sortField;
    request.sort.order = (this._reference.sortDirection || 'asc').toUpperCase();
    request.filter[this._reference.filterField] = this.inputFormControl.value;
    return this.apiBusiness.search(this.pass.column.reference.reference, request).subscribe((data) => {
      this.filteredItems = data.value
        .filter((x) => {
          return this.formControl.value != x.id;
        })
        .map((x) => {
          var option: OnkaOption = {
            key: x.id,
            label: x.name,
          };
          return option;
        });
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this._selectedText = event.option.viewValue;
    this.formControl.setValue(event.option.value);
    this.input.nativeElement.value = '';
    this.inputFormControl.setValue(this._selectedText, { emitEvent: false });
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
  OnkaMultiReferenceComponent,
  OnkaReferenceComponent
};
