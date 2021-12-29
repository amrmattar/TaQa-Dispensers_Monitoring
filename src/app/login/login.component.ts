import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import jwt_decode from 'jwt-decode';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  register = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  claims: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private oauthService: OAuthService
  ) {}
  error = '';
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  get r() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.oauthService
      .fetchTokenUsingPasswordFlow(this.f.email.value, this.f.password.value)
      .then((resp) => {
        if (resp !== null) {
          // console.log(resp);
           this.claims = jwt_decode(resp.access_token);
          console.log(this.claims.Permissions);
          localStorage.setItem('Permissions_taqa', this.claims.Permissions);
          console.log(this.claims.Permissions);
          if (this.claims.Permissions.find((e) => e == 'dashboard') != undefined
          ) {
            this.router.navigate(['/dashboard']);
          }else{
            this.router.navigate(['/panel']);
          }
        }
      });
  }
}
