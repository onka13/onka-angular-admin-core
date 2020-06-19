import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as lodash from 'lodash';
import * as en from '../../../assets/l10n/en.json';
import * as tr from '../../../assets/l10n/tr.json';
import { ConfigService } from './config-service';
import { StaticService } from './static-service';

export type LanguagelistType = { [x: string]: () => Promise<any> };

/**
 * Localization service
 */
@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  /**
   * Json content of l10n
   */
  jsonContent = {};

  /**
   * Language list
   */
  langList: LanguagelistType = {
    en: () => Promise.resolve(en),
    tr: () => Promise.resolve(tr),
  };

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private staticService: StaticService
  ) {
    // get extended langs
    console.log('LocaleService cons');
  }

  /**
   * Load default language
   */
  loadDefaultLang(): Promise<any> {
    var lang = this.staticService.getCurrentLang();
    return this.changeLang(lang);
  }

  /**
   * Change selected language
   * @param lang language
   */
  changeLang(lang: string): Promise<any> {
    if (!lang) lang = 'en';
    console.log('LocaleService changeLang', lang);
    this.staticService.setCurrentLang(lang);
    const part1 = this.langList[lang];
    const part2 = this.configService.getLangList()[lang];
    return part1()
      .then((data) => {
        console.log('changeLang1', data.default);
        this.jsonContent = data.default;
      })
      .then(() => {
        if (part2) return part2();
      })
      .then((newData) => {
        console.log('changeLang2', newData);
        if (!newData) return;
        this.jsonContent = lodash.merge(this.jsonContent, newData.default);
        console.log('final', this.jsonContent);
      })
      .catch((error) => {
        return Promise.resolve();
      });
  }

  /**
   * get content by key
   * @param key key
   * @param defaultValue default value
   */
  get(key: string, defaultValue?: string): any {
    return lodash.get(this.jsonContent, key, defaultValue);
  }

  /**
   * Get translation by key
   * @param key key
   * @param defaultValue default value
   * @param formatParams parameters to replace, like; { title: 'Hello' }
   */
  translate(key: string, defaultValue?: string, formatParams?: object): string {
    return lodash.template(this.get(key, defaultValue))(formatParams);
  }

  private getValue(key): string {
    var keys = key.split('.');
    var root: any = this.jsonContent;
    for (let i = 0; i < keys.length; i++) {
      root = root[keys[i]];
      if (!root) return;
    }
    return root;
  }
}
