import { Component, OnInit, AfterViewInit } from '@angular/core';

/**
 * Display actions left side
 */
@Component({
  selector: 'onka-actions-left',
  template: '<ng-content></ng-content>'
})
export class OnkaActionsLeftComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  ngAfterViewInit() {}
}
