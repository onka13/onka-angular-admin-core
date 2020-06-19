import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { OnkaService } from '../business/services/onka-service';
import { OnkaPageConfig } from '../domain/onka/onka-page-config';

export type OnkaMenuItem = {
  name: string;
  icon: string;
  label?: string;
  subMenus?: OnkaPageConfig[];
};

/**
 * Onka menu component
 */
@Component({
  selector: 'onka-menu',
  template: `
    <mat-accordion [togglePosition]="'before'">
      <mat-list>
        <mat-nav-list>
          <a
            mat-list-item
            [routerLink]="['/']"
            routerLinkActive="list-item-active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <mat-icon matListIcon>dashboard</mat-icon>
            <h4 mat-line>Home</h4>
          </a>
          <mat-expansion-panel *ngFor="let menu of menuList; index as i">
            <mat-expansion-panel-header *ngIf="menu.subMenus.length > 0">
              <mat-icon matListIcon>{{ menu.icon }}</mat-icon>
              <span class="menu-title-text">{{ menu.label }}</span>
            </mat-expansion-panel-header>
            <ng-container *ngFor="let pageConfig of menu.subMenus; index as j">
              <a
                mat-list-item
                [routerLink]="[pageConfig.route]"
                routerLinkActive="list-item-active"
              >
                <h4 mat-line>{{ onkaService.getRouteLabel(pageConfig) }}</h4>
              </a>
            </ng-container>
          </mat-expansion-panel>
        </mat-nav-list>
      </mat-list>
    </mat-accordion>
  `,
})
export class OnkaMenuComponent implements OnInit, AfterViewInit {
  /**
   * Menu items
   */
  @Input() menuList: OnkaMenuItem[] = [];

  /**
   * All module config list
   */
  @Input() allModuleConfigs: OnkaPageConfig[] = [];

  constructor(public onkaService: OnkaService) {}

  ngOnInit(): void {
    this.initMenu();
  }

  ngAfterViewInit() {}

  /**
   * Prepare menu
   */
  initMenu(): void {
    for (let i = 0; i < this.menuList.length; i++) {
      const menu = this.menuList[i];
      this.menuList[i].subMenus = this.getSubRoutes(this.menuList[i].name);
      this.menuList[i].label = this.onkaService.translate(
        'menu.' + this.menuList[i].name
      );
    }
  }

  /**
   * Get child menus
   * @param menuName menu name
   */
  getSubRoutes(menuName): OnkaPageConfig[] {
    return this.allModuleConfigs
      .filter((x) => x.menu == menuName)
      .sort((a, b) => {
        return a.menuOrder - b.menuOrder;
      });
  }
}
