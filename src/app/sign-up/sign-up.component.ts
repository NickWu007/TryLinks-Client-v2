import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const passwordMatch: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  console.log(password.value);
  console.log(confirmPassword.value);

  return password && confirmPassword && password.value !== confirmPassword.value ?
  { passwordNotMatched: true } : null;
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  formGroup = this.fb.group({
    username: ['', Validators.pattern('[a-zA-Z0-9]*')],
    email: ['', Validators.email],
    password: [''],
    confirmPassword: ['']
  }, { validators: passwordMatch });

  hidePassword = true;
  signUpFailed = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
  }

  onSignUp(): void {
    // TODO: add call to server for sign in.

    this.signUpFailed = true;
    this.username.setErrors({incorrect: true});
    this.email.setErrors({incorrect: true});
    this.password.setErrors({incorrect: true});
    this.confirmPassword.setErrors({incorrect: true});
  }

  resetSignInError(): void {
    this.signUpFailed = false;
  }

  get username() {
    return this.formGroup.get('username');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }
}
