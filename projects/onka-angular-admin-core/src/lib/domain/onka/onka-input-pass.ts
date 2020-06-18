import { OnkaPageField } from './onka-page-field';
import { OnkaPageConfig } from './onka-page-config';

export class OnkaInputPass {
  pageConfig: OnkaPageConfig;
  column: OnkaPageField;
  data: any;
  isEdit: boolean;

  public constructor(init?: Partial<OnkaInputPass>) {
    Object.assign(this, init);
  }
}
