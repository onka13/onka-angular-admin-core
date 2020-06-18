import { OnkaPageField } from './onka-page-field';

export class OnkaPageConfig {
  menu: string;
  menuOrder: number;
  route: string;
  moduleKey: string;
  pageKey: string;
  hideMenu: boolean;

  get: boolean;
  edit: boolean;
  new: boolean;
  delete: boolean;
  export: boolean;
  primaryKeys: string[];

  fields: OnkaPageField[];
  
  public constructor(init?: Partial<OnkaPageConfig>) {
    Object.assign(this, init);
  }
}