import { Component, OnInit, AfterViewInit } from '@angular/core';

/**
 * Display content at the top
 */
@Component({
  selector: 'onka-drawer-top',
  template: '<ng-content></ng-content>'
})
export class OnkaDrawerTopComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  ngAfterViewInit() {}
}
