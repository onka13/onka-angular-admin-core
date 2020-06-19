import { Injectable } from '@angular/core';
import { OnkaPageField } from '../../domain/onka/onka-page-field';
import { OnkaPageConfig } from '../../domain/onka/onka-page-config';
import { LocaleService } from './locale-service';
import { ActivatedRoute, Router, NavigationEnd, Params } from '@angular/router';
import { OnkaPageType } from '../../domain/onka/onka-types';
import { filter, map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, zip, Subject } from 'rxjs';

/**
 * Contains business related the onka admin system
 */
@Injectable({
  providedIn: 'root',
})
export class OnkaService {
  /**
   * Selected last page
   */
  public selectedPage = new BehaviorSubject<OnkaPageConfig>(null);

  /**
   * Emits to refresh data
   */
  public refreshPage = new Subject<any>();

  /**
   * Stores last page parameters
   */
  params: Params = {};

  /**
   * Stores last query parameters
   */
  queryParams;

  constructor(
    private localeService: LocaleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => zip(route.params, route.queryParams))
      )
      .subscribe((q) => {
        this.params = q[0] || {};
        this.queryParams = q[1] || {};
        console.log('PARAMS', this.params);
        console.log('queryParams', this.queryParams);
      });
  }
  /**
   * Get translatation by key
   */
  translate(
    key: string,
    defaultValue?: string,
    formatParams?: object
  ): string | any {
    return this.localeService.translate(key, defaultValue, formatParams);
  }
  /**
   * Get translated enum
   * @param enumObj enum object
   * @param enumName enum name
   * @param val value
   */
  translatEnum(enumObj, enumName, val) {
    var key = Object.keys(enumObj).filter((x) => enumObj[x] == val);
    if (key.length > 0) return this.translatEnumKey(enumName, key[0]);
    return null;
  }

  /**
   * Get translated text by enum key
   * @param enumName enum name
   * @param key key
   */
  translatEnumKey(enumName, key) {
    return this.translate('enums.' + enumName + '.' + key);
  }

  /**
   * Get column translated label
   */
  getColumnLabel(pageConfig: OnkaPageConfig, column: OnkaPageField): string {
    if (column.label) return column.label;
    return this.localeService.translate(
      `resources.${pageConfig.route}.fields.${column.name}`,
      column.name
    );
  }

  /**
   * Get route translated labels
   */
  getRouteLabel(pageConfig: OnkaPageConfig, name: string = 'name'): string {
    if (!pageConfig) return '';
    return this.localeService.translate(
      `resources.${pageConfig.route}.${name}`,
      name
    );
  }
  
  /**
   * Get primary keys of page
   */
  getPrimaryKeys(pageConfig: OnkaPageConfig): string {
    return this.params['id'];
  }

  getUpsertInputColumns(pageConfig: OnkaPageConfig): OnkaPageField[] {
    var isEdit = this.getPrimaryKeys(pageConfig);
    return pageConfig.fields.filter((x) =>
      isEdit ? x.isEditable : x.isCreatable
    );
  }
  getDetailColumns(pageConfig: OnkaPageConfig): OnkaPageField[] {
    return pageConfig.fields.filter((x) => x.inDetail);
  }

  /**
   * Go to page 
   */
  gotoPage(
    pageType: OnkaPageType,
    pageConfig: OnkaPageConfig,
    extra: {
      id?: any;
      preserveQueryParams?: boolean;
    } = { preserveQueryParams: true }
  ) {
    if (pageType == 'none') return;

    var route = '/' + pageConfig.route;
    if (pageType == 'create') {
      route += '/create';
    } else if (pageType == 'edit') {
      route += '/edit/' + extra.id;
    } else if (pageType == 'detail') {
      route += '/detail/' + extra.id;
    } else if (pageType == 'list') {
    }
    this.router.navigate(
      [route],
      extra.preserveQueryParams ? { queryParams: this.queryParams } : {}
    );
  }
  
  /* Dialog */
  isDialog(): boolean {
    return this.queryParams['dialog'] == '1';
  }
  isHideFilters(): boolean {
    return this.queryParams['hideFilters'] == '1';
  }
  isSelectField(): boolean {
    return this.queryParams['selectField'] == '1';
  }
  isHideActions(): boolean {
    return this.queryParams['hideActions'] == '1';
  }
  isHideDefaultFilters(): boolean {
    return this.queryParams['hideDefaultFilters'] == '1';
  }
  getDefaultValues() {
    return JSON.parse(this.queryParams['defaultValues'] || '{}');
  }
  getRedirect(): OnkaPageType {
    return this.queryParams['redirect'];
  }
  getDialogId(): number {
    return this.queryParams['dialogId'];
  }
  getDialogTitle(): string {
    return this.queryParams['title'];
  }
  hasToolbar(): boolean {
    return this.queryParams['toolbar'] == '1';
  }

  /**
   * Close dialog
   * @param record data
   */
  closeDialog(record?: any) {
    var callback = window.parent['iframeCallback' + this.getDialogId()];
    if (callback) {
      callback(record);
    }
  }
}
