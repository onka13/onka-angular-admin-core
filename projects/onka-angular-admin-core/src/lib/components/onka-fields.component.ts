import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OnkaGridPass } from '../domain/onka/onka-grid-pass';
import { OnkaDetailPass } from '../domain/onka/onka-detail-pass';
import { OnkaService } from '../business/services/onka-service';

/**
 * Onka grid field component
 */
@Component({
  selector: 'onka-grid-field',
  template: '<span>{{ data.data[data.column.name] }}</span>',
})
export class OnkaGridFieldComponent implements OnInit, AfterViewInit {
  constructor(public data: OnkaGridPass) {
    //console.log('data', data);
  }
  ngOnInit(): void {}

  ngAfterViewInit() {}
}

/**
 * Onka detail field component
 */
@Component({
  selector: 'onka-detail-field',
  template: `<div class="detail-row">
    <label>{{ getLabel() }}</label>
    <span>{{ val }}</span>
  </div>`,
})
export class OnkaDetailFieldComponent implements OnInit, AfterViewInit {
  /**
   * Displayed value
   */
  val;

  constructor(public pass: OnkaDetailPass, public onkaService: OnkaService) {
    //console.log('OnkaDetailFieldComponent', pass.column.name, pass.data);
    this.val = pass.data[pass.column.name];
    if (pass.column.enumName) {
      var enumObj = Object.keys(pass.column.enum).filter((x) => pass.column.enum[x] == this.val);
      if (enumObj.length > 0) this.val = onkaService.translate('enums.' + pass.column.enumName + '.' + enumObj[0]);
    }
  }
  ngOnInit(): void {}

  ngAfterViewInit() {}

  /**
   * Get translated label
   */
  getLabel() {
    return this.onkaService.getColumnLabel(this.pass.pageConfig, this.pass.column);
  }
}

export const allFields = { OnkaGridFieldComponent, OnkaDetailFieldComponent };
