import { Component, OnInit, ContentChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { OnkaPageConfig } from '../../domain/onka/onka-page-config';
import { AccountBusinessLogic } from '../../business/services/account-business-logic';
import { LocaleService } from '../../business/services/locale-service';
import { OnkaService } from '../../business/services/onka-service';
import { UIManagerService } from '../../business/uimanager.service';
import { OnkaDrawerTopComponent } from '../content/onka-drawer-top.component';
import { OnkaDrawerFooterComponent } from '../content/onka-drawer-footer.component';

@Component({
  selector: 'onka-master',
  templateUrl: './onka-master.component.html',
})
export class OnkaMasterComponent implements OnInit {
  pageConfig: OnkaPageConfig;

  @ContentChild(OnkaDrawerTopComponent) drawerTop: ElementRef;
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
  getTitle() {
    return this.onkaService.getRouteLabel(this.pageConfig);
  }
  title_click() {
    this.onkaService.gotoPage('list', this.pageConfig);
  }
  logout() {
    this.accountBusiness.logout();
    this.router.navigate(['/login']);
  }
  changeLang(lang) {
    this.localeService.changeLang(lang);
    window.location.reload();
  }

  refresh() {
    this.onkaService.refreshPage.next();
  }

  /*test() {
    this.uiManager.openDialog(
      {
        data: {
          title: 'Warning!',
          content: 'Are you sure?',
          actions: [
            { label: 'No', value: 0 },
            { label: 'Yes', value: 1, color: 'primary' },
          ],
        },
      },
      (result) => {},
      {
        small: true,
      },
    );
    return;
    this.uiManager.openDialog(
      {
        //disableClose: true,
        //position: {
        //  right: '0',
        //},
        data: {
          url: 'AdminApi/AdminUserSearch',
          //hideFilters: true,
          addSelectField: true,
          defaultValues: { name: 'asd' },
          hideActions: true,
          hideDefaultFilters: true,
          title: 'Admin Users',
          toolbar: true,
          //redirect: 'edit'
        },
      },
      (record) => {
        console.log('selected record', record);
      },
      {
        //width: '400px',
        //height: '100vh',
        //width: '50vw',
        //height: '70vh',
        //fullScreen: true,
      },
    );
  }*/
}
