import { Component, OnInit, AfterViewInit } from '@angular/core';

/**
 * Display content at the bottom
 */
@Component({
  selector: 'onka-drawer-footer',
  template: '<ng-content></ng-content>'
})
export class OnkaDrawerFooterComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  ngAfterViewInit() {}
}
