import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  formGroup = this.fb.group({
    username: ['', Validators.pattern('[a-zA-Z0-9]*')],
    password: ['']
  });

  hidePassword = true;
  signInFailed = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
  }

  onSignIn(): void {
    // TODO: add call to server for sign in.

    this.signInFailed = true;
    this.username.setErrors({incorrect: true});
    this.password.setErrors({incorrect: true});
  }

  resetSignInError(): void {
    this.signInFailed = false;
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }
}
