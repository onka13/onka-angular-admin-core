import { OnkaPageField } from './onka-page-field';
import { OnkaPageConfig } from './onka-page-config';

/**
 * Data model for grid components
 */
export class OnkaGridPass {
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

  public constructor(init?: Partial<OnkaGridPass>) {
    Object.assign(this, init);
  }
}
