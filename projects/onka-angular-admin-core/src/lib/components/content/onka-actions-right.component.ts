import { Component, OnInit, AfterViewInit } from '@angular/core';

/**
 * Display actions right side
 */
@Component({
  selector: 'onka-actions-right',
  template: '<ng-content></ng-content>'
})
export class OnkaActionsRightComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  ngAfterViewInit() {}
}
