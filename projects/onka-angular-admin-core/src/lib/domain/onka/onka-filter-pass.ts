import { OnkaPageField } from './onka-page-field';
import { OnkaPageConfig } from './onka-page-config';

/**
 * Data model for filter components
 */
export class OnkaFilterPass {
  /**
   * Configuration data
   */
  pageConfig: OnkaPageConfig;

  /**
   * Field
   */
  column: OnkaPageField;

  /**
   * Load data
   */
  loadData: () => void;
  
  /**
   * On submit
   */
  onSubmit: () => void;

  public constructor(init?: Partial<OnkaFilterPass>) {
    Object.assign(this, init);
  }
}
