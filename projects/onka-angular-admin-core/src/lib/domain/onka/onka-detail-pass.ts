import { OnkaPageField } from './onka-page-field';
import { OnkaPageConfig } from './onka-page-config';

/**
 * Data model for detail components
 */
export class OnkaDetailPass {
  /**
   * Configuration data
   */
  pageConfig: OnkaPageConfig;

  /**
   * Field
   */
  column: OnkaPageField;

  /**
   * Data
   */
  data: any;

  public constructor(init?: Partial<OnkaDetailPass>) {
    Object.assign(this, init);
  }
}
