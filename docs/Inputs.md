## Input Components

- OnkaFilterComponent
- OnkaInputComponent
- OnkaCheckboxComponent
- OnkaDateComponent
- OnkaTextareaComponent
- OnkaSelectComponent
- OnkaSlideToggleComponent
- OnkaNumberComponent

### Custom Component

Extend your component from `OnkaInputComponent`. Don't forget to set formControl as `[formControl]="formControl"`.

```
@Component({
  selector: 'my-input',
  template: `
    <mat-form-field class="onka-input input-{{ pass.column.name }}">
      <mat-label>{{ getLabel() }}</mat-label>
      <input matInput [formControl]="formControl" type="number" />
      <mat-error *ngIf="formControl.invalid">{{ getErrorMessage() }}</mat-error>
    </mat-form-field>
  `,
})
export class OnkaNumberComponent extends OnkaInputComponent {
  constructor(
    public formControl: FormControl,
    public pass: OnkaInputPass,
    public onkaService: OnkaService
  ) {
    super(formControl, pass, onkaService);
  }
}
```