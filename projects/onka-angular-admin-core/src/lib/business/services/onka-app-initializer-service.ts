import { Injectable } from '@angular/core';
import { LocaleService } from './locale-service';
import { UIManagerService } from '../uimanager.service';

@Injectable({
  providedIn: "root"
})
export class OnkaAppInitializerService {
  constructor(private localeService: LocaleService, private uiManager: UIManagerService) {}

  init(): Promise<any> {
    return Promise.all([this.localeService.loadDefaultLang()]);
  }
}
