import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
  HttpParams,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IdentityServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get(environment.identityServerBase + '/users');
  }
  getPermissions() {
    return this.http.get(
      environment.identityServerBase + '/users/GetPermissions'
    );
  }
  getRolesPermissions() {
    return this.http.get(
      environment.identityServerBase + '/users/GetRolesPermissions'
    );
  }
  getRoles() {
    return this.http.get(environment.identityServerBase + '/users/getroles');
  }
  putEditUsers(user) {
    return this.http.post<any>(
      environment.identityServerBase + `/users/edit-user`,
      user,
      this.httpOptions
    );
  }
  putChangePassword(ChangePassword) {
    return this.http.post(
      environment.identityServerBase + `/users/change-password`,
      ChangePassword,
      this.httpOptions
    );
  }
  putUsers(newUser) {
    return this.http.post<any>(
      environment.identityServerBase + `/users`,
      newUser,
      this.httpOptions
    );
  }
  AddRoles(newRole) {
    return this.http.post<any>(
      environment.identityServerBase + `/users/AddRole`,
      newRole,
      this.httpOptions
    );
  }
  DeleteRoles(roleId) {
    return this.http.delete(
      environment.identityServerBase + `/users/DeleteRole/${roleId}`
    );
  }
}
