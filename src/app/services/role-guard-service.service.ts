import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardServiceService implements CanActivate {
  list_permissions: Array<string> = [];
  constructor(public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    
    let Permissions = JSON.stringify(localStorage.getItem('Permissions_taqa'));
    for (let i = 0; i < Permissions.length; i++) {
      if (Permissions.split(',')[i] == undefined) {
        break;
      }
      this.list_permissions.push(
        Permissions.split(',')[i].replace('_', ' ').replace('"', '')
      );
    }
if (this.list_permissions.find((e) => e == expectedRole) == undefined) {
    return false;
}
    return true;
  }
}
