import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { RequestHelper, Parameters, Method } from '../helpers/request-helper';
import { ServiceResult, ServiceHttpStatusResult } from '../../domain/api/service-result';
import { DummyError } from '../../domain/models/dummy-error';
import { ConfigService } from './config-service';
import { StaticService } from './static-service';

@Injectable({
  providedIn: 'root',
})
export class BaseBusinessLogicService {
  public apiResponse = new Subject<ServiceHttpStatusResult<any>>();

  private requestHelper: RequestHelper;
  constructor(http: HttpClient, config: ConfigService,private staticService: StaticService) {
    console.log('BaseBusinessLogicService cons');
    this.requestHelper = RequestHelper.instance(http, config.getApiUrl());
    this.processResponse = this.processResponse.bind(this);
  }
  request<T>(method: Method, endpoint: string, body?: any, parameters?: Parameters, headers?: Parameters): Observable<T> {
    console.log('REQUEST', method, endpoint);
    if (!headers) headers = {};
    if (this.staticService.getToken()) headers.AdminToken = this.staticService.getToken();

    return this.requestHelper
      .request(method, endpoint, body, parameters, headers)
      .pipe(catchError(this.processResponse))
      .pipe(
        tap(this.processResponse),
        map((response: any) => {
          //console.log('RESPONSE', response);
          if (!response || !response.body || !response.body.success) {
            throw new DummyError('No Success...');
          }
          return response;
        }),
        map((response) => {
          return response.body;
        }),
      );
  }

  processResponse<T>(response: HttpResponse<ServiceResult<T>> | HttpErrorResponse | any): Observable<HttpResponse<ServiceResult<T>>> {
    var body = response instanceof HttpErrorResponse ? (response as HttpErrorResponse).error : (response as HttpResponse<ServiceResult<T>>).body;

    this.apiResponse.next(
      new ServiceHttpStatusResult<any>({
        status: response.status,
        statusText: response.statusText,
        success: body?.success,
        code: body?.code,
        message: body?.message,
        value: body?.value,
      }),
    );

    // check error
    if (response.status == 400 || response.status < 200 || response.status >= 300) {
      throw new DummyError();
    }
    return of(response as HttpResponse<ServiceResult<T>>);
  }
}
