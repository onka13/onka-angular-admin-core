import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'onka-search-right',
  template: '<ng-content></ng-content>'
})
export class OnkaSearchRightComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  ngAfterViewInit() {}
}
