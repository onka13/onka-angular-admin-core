import { OnkaPageField } from './onka-page-field';
import { OnkaPageConfig } from './onka-page-config';

export class OnkaFilterPass {
  pageConfig: OnkaPageConfig;
  column: OnkaPageField;
  loadData: () => void;
  onSubmit: () => void;

  public constructor(init?: Partial<OnkaFilterPass>) {
    Object.assign(this, init);
  }
}
