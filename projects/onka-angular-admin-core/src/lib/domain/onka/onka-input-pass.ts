import { OnkaPageField } from './onka-page-field';
import { OnkaPageConfig } from './onka-page-config';

/**
 * Data model for input components
 */
export class OnkaInputPass {
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

  /**
   * update or create
   */
  isEdit: boolean;

  public constructor(init?: Partial<OnkaInputPass>) {
    Object.assign(this, init);
  }
}
