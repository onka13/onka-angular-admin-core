import { OnkaPageField } from './onka-page-field';
import { OnkaPageConfig } from './onka-page-config';

export class OnkaGridPass {
  pageConfig: OnkaPageConfig;
  column: OnkaPageField;
  data: any;  

  public constructor(init?: Partial<OnkaGridPass>) {
    Object.assign(this, init);
  }
}
