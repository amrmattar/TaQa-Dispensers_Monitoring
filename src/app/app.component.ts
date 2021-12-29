import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment.prod';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  img = true;
  title = 'pms';
  /**
   *
   */
  constructor(private oauthService: OAuthService, public router: Router) {
    this.oauthService.tokenEndpoint = environment.identityServer;
    this.oauthService.redirectUri = window.location.origin + '/';
    this.oauthService.clientId = 'taqa_web_client';
    this.oauthService.scope = 'taqa_mes_backend offline_access';
    this.oauthService.dummyClientSecret = 'taqa_web_client_secret';
    this.oauthService.requireHttps = false;
  }
}
