import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { VERSION } from '@angular/material/core';
import { NavItem } from '../../models/nav-item';
import { NavService } from '../../services/nav.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { OAuthService } from 'angular-oauth2-oidc';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit, AfterViewInit {
  @Output() closeSidenav = new EventEmitter<void>();
  @ViewChild('appDrawer', { static: false }) appDrawer: ElementRef | undefined;
  version = VERSION;
  list_permissions: Array<string> = [];
  navItems: NavItem[] = [
    {
      displayName: 'control room',
      route: 'control-room',
      icon: 'grid_view',
      photo: 'control-room (1).svg',
    },
    {
      displayName: 'dashboard',
      route: 'dashboard',
      icon: 'grid_view',
      photo: 'dashboard.svg',
    },
    {
      displayName: 'alarms',
      route: 'user-alert-settings',
      icon: 'list_alt',
      photo: 'notifications.svg',
    },
    {
      displayName: 'operation details',
      route: 'panel',
      icon: 'grid_view',
      photo: 'elements.svg',
    },
    {
      displayName: 'administartion',
      route: 'settings',
      icon: 'list_alt',
      photo: 'settings.svg',
    },
    {
      displayName: 'operatails',
      route: 'panel',
      icon: 'grid_view',
      photo: 'elements.svg',
    },
    {
      displayName: 'istartion',
      route: 'settings',
      icon: 'list_alt',
      photo: 'settings.svg',
    },
  ];

  constructor(
    private auth: OAuthService,
    private router: Router,
    private navService: NavService,
    private tokenStorageService: TokenStorageService
  ) {}
  ilogged;
  ngOnInit() {
    setTimeout(() => {
      let Permissions = JSON.stringify(localStorage.getItem('Permissions_taqa'));
      for (let i = 0; i < Permissions.length; i++) {
        if (Permissions.split(',')[i] == undefined) {
          break;
        }
        this.list_permissions.push(Permissions.split(',')[i].replace('_', ' ').replace('"', ''));
      }
      for (let k = 0; k < this.navItems.length; k++) {
        if (this.list_permissions.find((e) => e == this.navItems[k].displayName) == undefined ) {
          if (this.navItems[k].displayName == 'alarms') {
            if ( this.list_permissions.find((e) => e == 'operation details') == undefined) {
              this.navItems.splice(k, 1);
              k--;
            }
          } else {
            this.navItems.splice(k, 1);
            k--;
          }
          
        }
      }
    }, 100);
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  onClose() {
    this.closeSidenav.emit();
  }
  logout() {
    this.auth.logOut();
    this.router.navigate(['/']);
  }
  redirect() {
    this.router.navigate(['../control-room']);
  }
}
