/**
 * Pagination model
 */
export class Pagination {
  /**
   * Page number
   */
  page: number;

  /**
   * Page size
   */
  perPage: number;
}

/**
 * Sort model
 */
export class Sort {
  /**
   * field to sort
   */
  field: string;

  /**
   * asc or desc
   */
  order: string;
}

/**
 * Api search model
 */
export class ApiSearchRequest {
  /**
   * Pagination
   */
  pagination: Pagination;

  /**
   * Sort
   */
  sort: Sort;

  /**
   * Filter field values
   */
  filter: { [x: string]: any };

  constructor() {
    this.pagination = new Pagination();
    this.sort = new Sort();
    this.filter = {};
  }
}
