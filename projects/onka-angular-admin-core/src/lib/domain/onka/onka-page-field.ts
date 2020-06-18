import { ValidatorFn } from '@angular/forms';
import { Type } from '@angular/core';

export class OnkaPageField {
  name: string;
  label: string;
  enumName: string;
  enum: {};
  filterName: string;

  gridComponent: Type<any>;
  filterComponent: Type<any>;
  editComponent: Type<any>;
  createComponent: Type<any>;
  detailComponent: Type<any>;

  inFilter: boolean;
  inGrid: boolean;
  isSortable: boolean;
  inDetail: boolean;

  isEditable: boolean;
  isCreatable: boolean;

  validators: ValidatorFn[];
  format: (row: any, value: any) => string;

  public constructor(init?: Partial<OnkaPageField>) {
    Object.assign(this, init);
  }
}
