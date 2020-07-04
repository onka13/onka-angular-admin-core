

/**
 * Data model for reference components
 */
export class OnkaReference {
   /**
   * Reference route
   */
  reference: string;

  pageSize?: number = 10;

  sortField?: string;
  
  sortDirection?: string;

  filterField: string;

  public constructor(init?: Partial<OnkaReference>) {
    Object.assign(this, init);
  }
}
