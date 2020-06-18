import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'onka-actions-right',
  template: '<ng-content></ng-content>'
})
export class OnkaActionsRightComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {}

  ngAfterViewInit() {}
}
