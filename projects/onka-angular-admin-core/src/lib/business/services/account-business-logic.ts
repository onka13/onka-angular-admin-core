import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseBusinessLogicService } from './base-business-logic.service';
import { ServiceResult } from '../../domain/api/service-result';
import { StaticService } from './static-service';

@Injectable({
  providedIn: 'root',
})
export class AccountBusinessLogic {
  constructor(private business: BaseBusinessLogicService, private staticService: StaticService) {}

  isLoggedIn(): boolean {
    return this.staticService.isLoggedIn();
  }

  logout(): void {
    this.staticService.logout();
  }

  login(email: string, password: string): Observable<ServiceResult<any>> {
    return this.business
      .request<ServiceResult<object>>('POST', 'AdminApi/public/login', {
        email,
        password,
      })
      .pipe(
        tap((result) => {
          if (!result.value.token) throw Error('No token');
          this.staticService.login(result.value);
          return true;
        }),
      );
  }
}
