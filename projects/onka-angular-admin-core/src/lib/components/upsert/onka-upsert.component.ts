import {
  Component,
  OnInit,
  Input,
  Injector,
  ComponentFactoryResolver,
  ContentChild,
  ElementRef,
  ContentChildren,
  QueryList,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ComponentPortal } from '@angular/cdk/portal';
import { ApiBusinessLogic } from '../../business/services/api-business-logic';
import { OnkaInputPass } from '../../domain/onka/onka-input-pass';
import { OnkaInputComponent } from '../onka-inputs.component';
import { OnkaPageConfig } from '../../domain/onka/onka-page-config';
import { OnkaPageField } from '../../domain/onka/onka-page-field';
import { OnkaActionsLeftComponent } from '../content/onka-actions-left.component';
import { OnkaActionsRightComponent } from '../content/onka-actions-right.component';
import { OnkaTabComponent } from '../content/onka-tab.component';
import { OnkaService } from '../../business/services/onka-service';
import { OnkaPageStatus } from '../../domain/onka/onka-types';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

/**
 * Onka Upsert component
 */
@Component({
  selector: 'onka-upsert',
  templateUrl: './onka-upsert.component.html',
})
export class OnkaUpsertComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Configuration data
   */
  @Input() pageConfig: OnkaPageConfig;

  /**
   * Input column list
   */
  @Input() inputColumns: OnkaPageField[] = [];

  /**
   * Initial values
   */
  @Input() initialValues: any = {};

  /**
   * Tab components
   */
  @ContentChildren(OnkaTabComponent, { descendants: true }) tabs!: QueryList<
    OnkaTabComponent
  >;

  /**
   * Actions left content
   */
  @ContentChild(OnkaActionsLeftComponent) actionsLeft: ElementRef;

  /**
   * Actions right content
   */
  @ContentChild(OnkaActionsRightComponent) actionsRight: ElementRef;

  /**
   * Form
   */
  form: FormGroup;

  /**
   * Entity id
   */
  id: any;

  /**
   * Is update or create
   */
  isEdit = false;

  /**
   * Entity data
   */
  data = {};

  /**
   * Page status
   */
  status: OnkaPageStatus;

  /**
   * Refresh subscription
   */
  refreshSubscription: Subscription;

  /**
   * Default values
   */
  defaultValues: any;

  /**
   * Components
   */
  _portals = {};

  /**
   * Emit on submit
   */
  @Output('onSubmit') onSubmitForm = new EventEmitter();

  /**
   * Emit on load
   */
  @Output('onLoad') onLoadForm = new EventEmitter();

  /**
   * load route
   */
  @Input() loadRoute;

  /**
   * submit route
   */
  @Input() submitRoute;

  constructor(
    private fb: FormBuilder,
    public onkaService: OnkaService,
    private business: ApiBusinessLogic,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.form = this.fb.group({});
    this.id = this.onkaService.getPrimaryKeys(this.pageConfig);
    this.isEdit = this.id;
    this.onkaService.selectedPage.next(this.pageConfig);
    this.refreshSubscription = this.onkaService.refreshPage.subscribe(() => {
      this.loadData();
    });
    this.defaultValues = this.onkaService.getDefaultValues();
    this.data = { ...this.initialValues, ...this.defaultValues };
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    setTimeout(() => {
      this.loadData();
    });
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }

  /**
   * Make an api request
   */
  loadData() {
    if (!this.isEdit) {
      //this.bindDefaultValues();
      return;
    }
    this.status = 'loading';
    var route = this.loadRoute
      ? this.loadRoute
      : this.pageConfig.route + '/get/' + this.id;
    this.business
      .request('GET', route, null)
      .pipe(
        finalize(() => {
          this.status = 'done';
        })
      )
      .subscribe((data) => {
        this.data = data.value;
        var entity = {};
        for (const key in this.form.controls) {
          entity[key] = data.value[key];
        }
        this.form.patchValue(entity);
      });
  }

  /**
   * Get component
   */
  getPortal(item: OnkaPageField) {
    if (this.onkaService.isHideDefaultFilters()) {
      // hide filters active
      if (Object.keys(this.defaultValues).indexOf(item.name) != -1) return null;
    }
    if (this._portals[item.name]) return this._portals[item.name];
    if (!this.form.controls[item.name])
      this.form.addControl(
        item.name,
        new FormControl(this.data[item.name], { validators: item.validators })
      );
    var injector2 = Injector.create({
      providers: [
        {
          provide: FormControl,
          useValue: this.form.get(item.name),
        },
        {
          provide: OnkaInputPass,
          useValue: new OnkaInputPass({
            pageConfig: this.pageConfig,
            column: item,
            data: this.data,
            isEdit: this.isEdit,
          }),
        },
      ],
      parent: this.injector,
    });
    this._portals[item.name] = new ComponentPortal(
      (this.isEdit ? item.editComponent : item.createComponent) ||
        OnkaInputComponent,
      null,
      injector2,
      this.componentFactoryResolver
    );
    return this._portals[item.name];
  }

  /**
   * On form submit
   */
  onSubmit() {
    if (!this.form.valid || this.status == 'loading') {
      return;
    }
    const newData = { ...this.data, ...this.form.value };
    if (this.onSubmitForm.observers.length > 0) {
      this.onSubmitForm.emit(newData);
      return;
    }
    this.status = 'loading';
    var res = this.submitRoute
      ? this.business.request('POST', this.submitRoute, null)
      : this.business.upsert(this.isEdit, this.pageConfig.route, newData);

    res
      .pipe(
        finalize(() => {
          this.status = 'done';
        })
      )
      .subscribe((record) => {
        var redirect = this.onkaService.getRedirect() || 'list';
        this.onkaService.gotoPage(redirect, this.pageConfig, {
          id: record.value.id,
          preserveQueryParams: true,
        });
      });
  }
}
