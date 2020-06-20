import { Injectable, NgZone } from '@angular/core';
import { BaseBusinessLogicService } from './services/base-business-logic.service';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceHttpStatusResult } from '../domain/api/service-result';
import { Router } from '@angular/router';
import { ConfigService } from './services/config-service';
import { LocaleService } from './services/locale-service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { OnkaDialogComponent, DialogData } from '../components/onka-dialog.component';
import { MessageType } from '../domain/onka/onka-types';

/**
 * Contains ui related helpers
 */
@Injectable({
  providedIn: 'root',
})
export class UIManagerService {
  constructor(
    private iconRegistry: MatIconRegistry,
    private businessBase: BaseBusinessLogicService,
    private snackBar: MatSnackBar,
    private router: Router,
    private config: ConfigService,
    private localeService: LocaleService,
    public dialog: MatDialog,
  ) {
    this.init();
  }

  /**
   * initialize
   */
  init() {
    console.log('UIManagerService init', this.snackBar);
    // mat-icon default font
    this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');

    // catch all api responses
    this.businessBase.apiResponse.subscribe((data) => this.onApiResponse(data));
  }

  /**
   * Process api response
   * @param response http response
   */
  private onApiResponse(response: ServiceHttpStatusResult<any>) {
    if (!response) return;
    console.log('api response', response);

    var localeKey = 'onka.api.code' + response.code;
    var msg = this.localeService.translate(localeKey);
    if (msg == localeKey) msg = response.message;
    if (msg) {
      this.displayMessage(msg, 'info');
    }
    if (response.status == 400) {
      if (response.code == 100) {
        this.router.navigate(['/login']);
      }
      return;
    }
    if (response.status < 200 || response.status >= 300) {
      this.displayMessage(this.config.isProd() ? this.localeService.translate('onka.error') : response.statusText, 'error');
    }
  }

  /**
   * Display message
   * @param msg message
   * @param type type
   */
  displayMessage(msg: string, type: MessageType) {
    if (!msg) return;
    const snack = this.snackBar.open(msg, type == 'error' ? 'X' : null, {
      duration: type == 'error' ? 0 : 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: type == 'error' ? 'snack-error' : 'snack-success',
    });
    snack.onAction().subscribe(() => {
      snack.dismiss();
    });
  }

  /**
   * Opne dialog
   */
  openDialog(
    config: MatDialogConfig<DialogData>,
    afterClosed?: (result: any) => void,
    options?: {
      fullScreen?: boolean;
      small?: boolean;
      width?: string;
      height?: string;
    },
  ) {
    if (!options) options = {};
    if (options.fullScreen) {
      config.width = '100vw';
      config.maxWidth = '100vw';
      config.height = '100vh';
    } else if (options.small) {
      config.width = '30vw';
      config.maxWidth = '30vw';
      config.height = '40vh';
    }
    if (!config.width) config.width = options.width || '95vw';
    if (!config.maxWidth) config.maxWidth = options.width || '95vw';
    if (!config.height) config.height = options.height || '90vh';

    const dialogRef = this.dialog.open(OnkaDialogComponent, {
      hasBackdrop: true,
      //panelClass: 'dialog-panel',
      ...config,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (afterClosed) afterClosed(result);
    });
  }

  /**
   * Open confirm dialog
   */
  confirm(data: DialogData, callback: (res: any) => void) {
    this.openDialog(
      {
        data: {
          ...{
            title: 'Warning!',
            content: 'Are you sure?',
            actions: [
              { label: 'No', value: false },
              { label: 'Yes', value: true, color: 'primary' },
            ],
          },
          ...data,
        },
      },
      (result) => {
        callback(result);
      },
      {
        small: true,
      },
    );
  }
}
