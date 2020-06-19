import { Injectable } from '@angular/core';
import { LanguagelistType } from './locale-service';

/**
 * Configuration service
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  /**
   * Api Url
   */
  _apiUrl: string;

  /**
   * True if prod env
   */
  _isProd: boolean;

  /**
   * Language list
   */
  _langList: LanguagelistType = {};

  getApiUrl() {
    return this._apiUrl;
  }

  setApiUrl(url) {
    this._apiUrl = url;
  }

  getLangList(): LanguagelistType {
    return this._langList || {};
  }

  setLangList(langList: LanguagelistType) {
    this._langList = langList;
  }

  isProd() {
    return this._isProd;
  }

  setIsProd(isProd) {
    this._isProd = isProd;
  }
}
