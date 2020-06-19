import { OnkaPageField } from './onka-page-field';

/**
 * Page configuration model
 */
export class OnkaPageConfig {
  /**
   * Menu name
   */
  menu: string;

  /**
   * Menu order
   */
  menuOrder: number;

  /**
   * Route
   */
  route: string;

  /**
   * Module key
   */
  moduleKey: string;

  /**
   * Page key
   */
  pageKey: string;

  /**
   * Hide menu
   */
  hideMenu: boolean;

  /**
   * Is detail enabled
   */
  get: boolean;

  /**
   * Is edit enabled
   */
  edit: boolean;

  /**
   * Is create enabled
   */
  new: boolean;

  /**
   * Is delete enabled
   */
  delete: boolean;

  /**
   * Is export enabled
   */
  export: boolean;

  /**
   * Primary keys
   */
  primaryKeys: string[];

  /**
   * Field list
   */
  fields: OnkaPageField[];

  public constructor(init?: Partial<OnkaPageConfig>) {
    Object.assign(this, init);
  }
}
