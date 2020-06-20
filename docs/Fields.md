## Field Components

- OnkaGridFieldComponent
- OnkaDetailFieldComponent

### Custom Grid Component

```
@Component({
  selector: 'my-grid-field',
  template: '<b>{{ data.data[data.column.name] }}</b>',
})
export class OnkaGridFieldComponent {
  constructor(public data: OnkaGridPass) {    
  }
}

```

### Custom Detail Component

```
@Component({
  selector: 'my-detail-field',
  template: `<div class="detail-row">
    <label>{{ getLabel() }}</label>
    <span>{{ pass.data[pass.column.name] }}</span>
  </div>`,
})
export class OnkaDetailFieldComponent {

  constructor(public pass: OnkaDetailPass, public onkaService: OnkaService) {
  }

  getLabel() {
    return this.onkaService.getColumnLabel(this.pass.pageConfig, this.pass.column);
  }
}


```