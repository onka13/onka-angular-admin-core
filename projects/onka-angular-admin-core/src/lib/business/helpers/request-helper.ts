import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * default http parameters
 */
const httpOptions = {
  timeout: 60000,
  uploadTimeout: 300000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    //Authorization: 'my-auth-token',
  },
};

export type Parameters = { [x: string]: any };
export type Method = 'POST' | 'PUT' | 'GET' | 'DELETE';

/**
 * A httpClient helper
 */
export class RequestHelper {
  /**
   * Base Url
   */
  URL: string;
  private constructor(private http: HttpClient, url: string) {
    this.URL = url;
  }

  static instance(http: HttpClient, url: string): RequestHelper {
    return new RequestHelper(http, url);
  }

  /**
   * make a request to url
   * @param method method type
   * @param endpoint endpoint address
   * @param body request body
   * @param parameters parameters
   * @param headers headers
   */
  request<T>(method: Method, endpoint: string, body?: any, parameters?: Parameters, headers?: Parameters): Observable<HttpResponse<T>> {
    const options = this.getOptions(body, parameters, headers) as any;
    const url = `${this.URL}${endpoint.indexOf('/') == 0 ? '' : '/'}${endpoint}`;
    console.log('request method', method);
    console.log('request url', url);
    console.log('request options', options);    
    return this.http.request<T>(method, url, options) as Observable<HttpResponse<T>>;
    // .pipe(catchError(this.handleError))
  }

  /**
   * use 'get' method to get url content 
   */
  get<T>(endpoint: string, parameters?: Parameters, headers?: Parameters): Observable<HttpResponse<T>> {
    return this.request('GET', null, endpoint, parameters, headers);
  }

  /**
   * use 'post' method to get url content 
   */
  post<T>(endpoint: string, body: any, parameters?: Parameters, headers?: Parameters): Observable<HttpResponse<T>> {
    return this.request('POST', endpoint, body, parameters, headers);
  }

  /**
   * use 'put' method to get url content 
   */
  put<T>(endpoint: string, body: any, parameters?: Parameters, headers?: Parameters): Observable<HttpResponse<T>> {
    return this.request('PUT', body, endpoint, parameters, headers);
  }

  /**
   * use 'delete' method to get url content 
   */
  delete<T>(endpoint: string, parameters?: Parameters, headers?: Parameters): Observable<HttpResponse<T>> {
    return this.request('DELETE', null, endpoint, parameters, headers);
  }

  /**
   * get options
   */
  private getOptions(body?: any, parameters?: Parameters, headers?: Parameters) {
    const httpParams = new HttpParams();
    const httpHeaders = { ...httpOptions.headers }; //new HttpHeaders(httpOptions.headers);
    if (parameters) {
      for (const key in parameters) {
        httpParams.set(key, parameters[key]);
      }
    }
    if (headers) {
      for (const key in headers) {
        httpHeaders[key] = headers[key];
      }
    }

    return {
      body,
      headers: httpHeaders,
      params: httpParams,
      observe: 'response',
    };
  }
}
