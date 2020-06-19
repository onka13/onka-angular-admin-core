import { Component } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountBusinessLogic } from '../../business/services/account-business-logic';
import { ApiBusinessLogic } from '../../business/services/api-business-logic';
import { HttpClient } from '@angular/common/http';

/**
 * Onka login component
 */
@Component({
  selector: 'onka-login',
  templateUrl: './onka-login.component.html',
  styles: [
    `
      mat-card {
        max-width: 400px;
        margin: 2em auto;
        text-align: center;
      }
      mat-form-field {
        display: block;
      }
    `,
  ],
})
export class OnkaLoginComponent {
  /**
   * login form
   */
  form: FormGroup;

  /**
   * Return url
   */
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountBusiness: AccountBusinessLogic
  ) {}

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/panel';

    this.form = this.fb.group({
      username: ['admin@mail.com', Validators.email],
      password: ['1', Validators.required],
    });
  }

  /**
   * On form submit
   */
  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;
    this.accountBusiness.login(username, password).subscribe((result) => {
      if (!result) return;
      let navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve',
        preserveFragment: true,
      };
      this.router.navigate(['/panel'], navigationExtras);
    });
  }
}
