import { OnkaPageField } from './onka-page-field';
import { OnkaPageConfig } from './onka-page-config';

export class OnkaDetailPass {
  pageConfig: OnkaPageConfig;
  column: OnkaPageField;
  data: any;

  public constructor(init?: Partial<OnkaDetailPass>) {
    Object.assign(this, init);
  }
}
