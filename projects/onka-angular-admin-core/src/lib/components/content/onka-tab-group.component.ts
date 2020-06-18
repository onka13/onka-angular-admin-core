import { Component, OnInit, AfterViewInit, ContentChild, TemplateRef, ViewChildren, QueryList, ContentChildren, ElementRef } from '@angular/core';
import { OnkaTabComponent } from './onka-tab.component';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'onka-tab-group',
  template: `<mat-tab-group>
    <ng-container *ngFor="let tab of tabs; index as i">
      <mat-tab>
        <ng-template mat-tab-label>
          {{ tab.label }}
        </ng-template>
        {{ tab.content }}
        <ng-content select="onka-tab"></ng-content>
      </mat-tab>
    </ng-container>
  </mat-tab-group>`,
})
export class OnkaTabGroupComponent implements OnInit, AfterViewInit {
  @ContentChildren(OnkaTabComponent) tabs: QueryList<OnkaTabComponent>;

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
