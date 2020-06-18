import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'onka-drawer-footer',
  template: '<ng-content></ng-content>'
})
export class OnkaDrawerFooterComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  ngAfterViewInit() {}
}
