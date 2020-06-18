import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'onka-search-left',
  template: '<ng-content></ng-content>'
})
export class OnkaSearchLeftComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  ngAfterViewInit() {}
}
