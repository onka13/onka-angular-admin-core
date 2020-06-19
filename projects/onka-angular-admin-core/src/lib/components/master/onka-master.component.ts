import { Component, OnInit, ContentChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { OnkaPageConfig } from '../../domain/onka/onka-page-config';
import { AccountBusinessLogic } from '../../business/services/account-business-logic';
import { LocaleService } from '../../business/services/locale-service';
import { OnkaService } from '../../business/services/onka-service';
import { UIManagerService } from '../../business/uimanager.service';
import { OnkaDrawerTopComponent } from '../content/onka-drawer-top.component';
import { OnkaDrawerFooterComponent } from '../content/onka-drawer-footer.component';

/**
 * Onka master page if access granted
 */
@Component({
  selector: 'onka-master',
  templateUrl: './onka-master.component.html',
})
export class OnkaMasterComponent implements OnInit {
  /**
   * Last selected page
   */
  pageConfig: OnkaPageConfig;

  /**
   * Drawer top content
   */
  @ContentChild(OnkaDrawerTopComponent) drawerTop: ElementRef;

  /**
   * Drawer bottom content
   */
  @ContentChild(OnkaDrawerFooterComponent) drawerFooter: ElementRef;

  constructor(
    private accountBusiness: AccountBusinessLogic,
    private router: Router,
    private localeService: LocaleService,
    public onkaService: OnkaService,
    private uiManager: UIManagerService,
  ) {
    onkaService.selectedPage.subscribe((pageConfig) => {
      setTimeout(() => {
        this.pageConfig = pageConfig;
      });
    });
  }
  
  ngOnInit(): void {}

  /**
   * Get toolbar title
   */
  getTitle() {
    return this.onkaService.getRouteLabel(this.pageConfig);
  }

  /**
   * Toolbar title click
   */
  title_click() {
    this.onkaService.gotoPage('list', this.pageConfig);
  }

  /**
   * Logout user
   */
  logout() {
    this.accountBusiness.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Change language
   */
  changeLang(lang) {
    this.localeService.changeLang(lang);
    window.location.reload();
  }

  /**
   * Refresh displayed data 
   */
  refresh() {
    this.onkaService.refreshPage.next();
  }
}
