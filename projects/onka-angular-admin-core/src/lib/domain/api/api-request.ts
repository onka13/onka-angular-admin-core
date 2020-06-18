export class Pagination {
  page: number;
  perPage: number;
}
export class Sort {
  field: string;
  order: string;
}
export class ApiSearchRequest {
  pagination: Pagination;
  sort: Sort;
  filter: { [x: string]: any };

  constructor() {
      this.pagination = new Pagination();
      this.sort = new Sort();
      this.filter = {};      
  }
}
