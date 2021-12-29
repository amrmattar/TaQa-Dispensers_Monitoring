import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(private authservice: OAuthService, private router: Router) {}
  canActivate() {
    console.log('fgjmc')
    // return false
    if (this.authservice.getAccessToken() != null) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
