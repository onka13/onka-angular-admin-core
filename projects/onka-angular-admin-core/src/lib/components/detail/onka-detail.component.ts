import {
  Component,
  OnInit,
  Input,
  Injector,
  ComponentFactoryResolver,
  ContentChild,
  ElementRef,
  QueryList,
  ContentChildren,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentPortal } from '@angular/cdk/portal';
import { ApiBusinessLogic } from '../../business/services/api-business-logic';
import { OnkaPageConfig } from '../../domain/onka/onka-page-config';
import { OnkaPageField } from '../../domain/onka/onka-page-field';
import { OnkaDetailFieldComponent } from '../onka-fields.component';
import { OnkaDetailPass } from '../../domain/onka/onka-detail-pass';
import { OnkaActionsLeftComponent } from '../content/onka-actions-left.component';
import { OnkaActionsRightComponent } from '../content/onka-actions-right.component';
import { OnkaTabComponent } from '../content/onka-tab.component';
import { OnkaService } from '../../business/services/onka-service';
import { OnkaPageStatus } from '../../domain/onka/onka-types';
import { delay, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

/**
 * Onka detil component
 * 
 * 
 */
@Component({
  selector: 'onka-detail',
  templateUrl: './onka-detail.component.html',
})
export class OnkaDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Configuration Data
   */
  @Input() pageConfig: OnkaPageConfig;

  /**
   * Column list
   */
  @Input() displayColumns: OnkaPageField[];

  /**
   * Tab content
   */
  @ContentChildren(OnkaTabComponent, { descendants: true }) tabs!: QueryList<OnkaTabComponent>;

  /**
   * Actions side left content
   */
  @ContentChild(OnkaActionsLeftComponent) actionsLeft: ElementRef;

  /**
   * Actions side right content
   */
  @ContentChild(OnkaActionsRightComponent) actionsRight: ElementRef;

  /**
   * Id value
   */
  id: any;
  
  /**
   * edit or new 
   */
  isEdit = false;

  /**
   * data of entity
   */
  data;

  /**
   * page status
   */
  status: OnkaPageStatus;

  /**
   * Refresh data subscription
   */
  refreshSubscription: Subscription;

  /**
   * Portal list
   */
  _portals = {};

  constructor(
    public onkaService: OnkaService,
    private business: ApiBusinessLogic,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {}

  ngOnInit() {
    this.id = this.onkaService.getPrimaryKeys(this.pageConfig);
    this.onkaService.selectedPage.next(this.pageConfig);
    this.refreshSubscription = this.onkaService.refreshPage.subscribe(() => {
      this.loadData();
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadData();
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  /**
   * Load data if id exists
   */
  loadData() {
    if (!this.id) return;
    this.status = 'loading';
    this.business
      .get(this.pageConfig.route, this.id)
      .pipe(
        finalize(() => {
          this.status = 'done';
        }),
      )
      .subscribe((data) => {
        this._portals = {}; // clear portals to re render
        this.data = data.value;
        this.status = '';
      });
  }

  /**
   * Get component
   * @param item fields
   */
  getPortal(item: OnkaPageField) {
    if (this._portals[item.name]) return this._portals[item.name];
    var injector2 = Injector.create({
      providers: [
        {
          provide: OnkaDetailPass,
          useValue: new OnkaDetailPass({
            pageConfig: this.pageConfig,
            column: item,
            data: this.data,
          }),
        },
      ],
      parent: this.injector,
    });
    this._portals[item.name] = new ComponentPortal(item.detailComponent || OnkaDetailFieldComponent, null, injector2, this.componentFactoryResolver);
    return this._portals[item.name];
  }
}
