import { Component, OnInit, AfterViewInit, Input, Directive, TemplateRef } from '@angular/core';
import { OnkaPageField } from '../../domain/onka/onka-page-field';

@Component({
  selector: 'onka-tab',
  template: `<ng-content></ng-content>`
})
export class OnkaTabComponent implements OnInit, AfterViewInit {
  @Input() label: string;
  @Input() content: string;
  @Input() pageFields: OnkaPageField[];

  constructor() { }
  
  ngOnInit(): void {}

  ngAfterViewInit() {}
}
