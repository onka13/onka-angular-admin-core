import { Component, OnInit, AfterViewInit } from '@angular/core';

/**
 * Display content at the left of the search fields
 */
@Component({
  selector: 'onka-search-left',
  template: '<ng-content></ng-content>'
})
export class OnkaSearchLeftComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  ngAfterViewInit() {}
}
