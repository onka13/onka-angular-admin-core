import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  NgZone,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { OnkaPageType } from '../domain/onka/onka-types';
import { ThemePalette } from '@angular/material/core';

/**
 * Dialog action data
 */
export interface DialogDataAction {
  value: any;
  label: string;
  color?: ThemePalette;
}

/**
 * Dialog data
 */
export interface DialogData {
  url?: string;
  content?: string;
  dialogId?: number;
  addSelectField?: boolean;
  hideActions?: boolean;
  hideFilters?: boolean;
  hideDefaultFilters?: boolean;
  defaultValues?: Params;
  redirect?: OnkaPageType;
  title?: string;
  toolbar?: boolean;
  actions?: DialogDataAction[];
}

/**
 * Onka dialog component
 */
@Component({
  selector: 'onka-dialog',
  template: `<ng-container *ngIf="this.data.content">
      <div class="onka-dialog-content">
        <h1 mat-dialog-title>
          {{ this.data.title }}
        </h1>
        <div mat-dialog-content>
          <p>{{ this.data.content }}</p>
        </div>
        <div mat-dialog-actions>
          <ng-container *ngFor="let action of data.actions; index as i">
            <button
              mat-button
              (click)="onActionClick(action)"
              [color]="action.color"
            >
              {{ action.label }}
            </button>
          </ng-container>
        </div>
      </div>
    </ng-container>
    <iframe
      *ngIf="url"
      style="overflow:hidden;height:100%;width:100%"
      height="100%"
      width="100%"
      frameborder="0"
      [src]="url"
    ></iframe> `,
})
export class OnkaDialogComponent implements OnInit, AfterViewInit {
  /**
   * Url to display in iframe
   */
  url;

  constructor(
    public dialogRef: MatDialogRef<OnkaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sanitizer: DomSanitizer,
    private ngZone: NgZone
  ) {
    this.init();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  /**
   * Prepare data
   */
  init() {
    if (this.data.url) {
      if (!this.data.dialogId) this.data.dialogId = new Date().getTime();
      var baseUrl =
        '/#' + this.data.url + '?dialog=1&dialogId=' + this.data.dialogId;
      if (this.data.addSelectField) baseUrl += '&selectField=1';
      if (this.data.hideActions) baseUrl += '&hideActions=1';
      if (this.data.hideFilters) baseUrl += '&hideFilters=1';
      if (this.data.hideDefaultFilters) baseUrl += '&hideDefaultFilters=1';
      if (this.data.toolbar) baseUrl += '&toolbar=1';
      if (this.data.redirect) baseUrl += '&redirect=' + this.data.redirect;
      if (this.data.defaultValues)
        baseUrl += '&defaultValues=' + JSON.stringify(this.data.defaultValues);
      if (this.data.title) baseUrl += '&title=' + this.data.title;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(baseUrl);
      //console.log('SAFE', this.url);
    }
    window['iframeCallback' + this.data.dialogId] = (record) => {
      //console.log('iframeCallback1', record, this.data.iframeCallback);
      this.ngZone.run(() => {
        this.dialogRef.close(record);
      });
    };
  }

  /**
   * On clicked buttons
   * @param action action data
   */
  onActionClick(action: DialogDataAction): void {
    this.dialogRef.close(action.value);
  }
}
