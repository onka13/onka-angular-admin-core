import { ValidatorFn } from '@angular/forms';
import { Type } from '@angular/core';
import { OnkaReference } from './onka-reference';

/**
 * Field model
 */
export class OnkaPageField {
  /**
   * Field name
   */
  name: string;

  /**
   * Label
   */
  label: string;

  /**
   * Enum name
   */
  enumName: string;

  /**
   * Enum object
   */
  enum: {};

  /**
   * filter name
   */
  filterName: string;

  /**
   * Reference
   */
  reference: OnkaReference;

  /**
   * Grid component
   */
  gridComponent: Type<any>;

  /**
   * Filter component
   */
  filterComponent: Type<any>;

  /**
   * Update component
   */
  editComponent: Type<any>;

  /**
   * Create component
   */
  createComponent: Type<any>;

  /**
   * Detail component
   */
  detailComponent: Type<any>;

  /**
   * Display in filters
   */
  inFilter: boolean;

  /**
   * Display in search results
   */
  inGrid: boolean;

  /**
   * Is sortable
   */
  isSortable: boolean;

  /**
   * Display in detail page
   */
  inDetail: boolean;

  /**
   * Display in update page
   */
  isEditable: boolean;

  /**
   * Display in create page
   */
  isCreatable: boolean;

  /**
   * Validators
   */
  validators: ValidatorFn[];

  /**
   * Format in grid list
   */
  format: (row: any, value: any) => string;

  public constructor(init?: Partial<OnkaPageField>) {
    Object.assign(this, init);
  }
}
