import { Injectable } from '@angular/core';
import { LocaleService } from './locale-service';
import { UIManagerService } from '../uimanager.service';

/**
 * Prepare the onka services or values before app starts
 */
@Injectable({
  providedIn: "root"
})
export class OnkaAppInitializerService {
  constructor(private localeService: LocaleService, private uiManager: UIManagerService) {}

  /**
   * Init data before app starts
   */
  init(): Promise<any> {
    return Promise.all([this.localeService.loadDefaultLang()]);
  }
}
