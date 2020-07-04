import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseBusinessLogicService } from './base-business-logic.service';
import {
  ServiceResult,
  ServiceListResult,
} from '../../domain/api/service-result';
import { tap } from 'rxjs/operators';
import { ApiSearchRequest } from '../../domain/api/api-request';

/**
 * Api Business Logic
 */
@Injectable({
  providedIn: 'root',
})
export class ApiBusinessLogic {
  constructor(private business: BaseBusinessLogicService) {}

  /**
   * Search data
   * @param route route
   * @param request post data
   */
  search(route, request: ApiSearchRequest): Observable<ServiceListResult<any>> {
    return this.business.request<ServiceListResult<any>>(
      'POST',
      `${route}/all`,
      request
    );
  }

  /**
   * Get detail of the entity
   * @param route route
   * @param id id of item
   */
  get(route, id): Observable<ServiceResult<any>> {
    return this.business.request<ServiceResult<any>>(
      'GET',
      `${route}/get/${id}`
    );
  }

  /**
   * Gets key-value list
   * @param route route
   * @param id id of item
   */
  gets(route, ids: []): Observable<ServiceResult<any>> {
    return this.business.request<ServiceResult<any>>(
      'POST',
      `${route}/gets`,
      ids
    );
  }

  /**
   * Create new entity
   * @param route route
   * @param data entity data
   */
  new(route, data): Observable<ServiceResult<any>> {
    return this.business.request<ServiceResult<any>>(
      'POST',
      `${route}/new`,
      data
    );
  }

  /**
   * Update entity
   * @param route route
   * @param data entity data
   */
  update(route, data): Observable<ServiceResult<any>> {
    return this.business.request<ServiceResult<any>>(
      'POST',
      `${route}/update`,
      data
    );
  }

  /**
   * Update or Create entity
   * @param isEdit true if it's update
   * @param route route
   * @param data entity data
   */
  upsert(isEdit: boolean, route, data): Observable<ServiceResult<any>> {
    return isEdit ? this.update(route, data) : this.new(route, data);
  }

  /**
   * delete entity
   * @param route route
   * @param id entity id
   */
  delete(route, id): Observable<ServiceResult<any>> {
    return this.business.request<ServiceResult<any>>(
      'DELETE',
      `${route}/delete/${id}`
    );
  }

  request(method, route, data): Observable<ServiceResult<any>> {
    return this.business.request<ServiceResult<any>>(method, route, data);
  }
}
