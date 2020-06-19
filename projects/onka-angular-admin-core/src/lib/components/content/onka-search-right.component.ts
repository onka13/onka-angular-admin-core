import { Component, OnInit, AfterViewInit } from '@angular/core';

/**
 * Display content at the right of the search fields
 */
@Component({
  selector: 'onka-search-right',
  template: '<ng-content></ng-content>'
})
export class OnkaSearchRightComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  ngAfterViewInit() {}
}
