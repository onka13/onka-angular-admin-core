import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseBusinessLogicService } from './base-business-logic.service';
import { ServiceResult, ServiceListResult } from '../../domain/api/service-result';
import { tap } from 'rxjs/operators';
import { ApiSearchRequest } from '../../domain/api/api-request';

@Injectable({
  providedIn: 'root',
})
export class ApiBusinessLogic {
  constructor(private business: BaseBusinessLogicService) {}

  test(): Observable<any> {
    return this.business
      .request<ServiceResult<any>>('POST', 'AdminApi/AdminUserSearch/all', {
        pagination: {},
        sort: {},
        filter: {},
      })
      .pipe(tap((val) => {}));
  }

  search(route, request: ApiSearchRequest): Observable<ServiceListResult<any>> {
    return this.business.request<ServiceListResult<any>>('POST', `${route}/all`, request);
  }

  get(route, id): Observable<ServiceResult<any>> {
    return this.business.request<ServiceResult<any>>('GET', `${route}/get/${id}`);
  }
  
  new(route, data): Observable<ServiceResult<any>> {
    return this.business.request<ServiceResult<any>>('POST', `${route}/new`, data);
  }
  
  update(route, data): Observable<ServiceResult<any>> {
    return this.business.request<ServiceResult<any>>('POST', `${route}/update`, data);
  }

  upsert(isEdit: boolean, route, data): Observable<ServiceResult<any>> {
    return isEdit ? this.update(route, data) : this.new(route, data);
  }

  delete(route, id): Observable<ServiceResult<any>> {
    return this.business.request<ServiceResult<any>>('DELETE', `${route}/delete/${id}`);
  }
}
