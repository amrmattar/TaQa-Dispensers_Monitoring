import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  constructor(private http:HttpClient) { }

  login(email: string, password: string){
    return this.http.post(`http://20.71.116.162/taqareports/api/ApplicationUsers/login`, { email, password })
    .pipe(map(response=>{
      if(response && response["token"])
      {localStorage.setItem("token",response["token"]);
      localStorage.setItem("email",response["email"]);
      localStorage.setItem("role",response["role"]);
      localStorage.setItem("id",response["id"]);
      return true;}
      return false;
    }))

}
register(username,email,password){
  
return this.http.post(`http://20.71.116.162/taqareports/api/ApplicationUsers/register`, { username,email, password });
}
registerAdmin(username,email,password){
  
  return this.http.post(`http://20.71.116.162/taqareports/api/ApplicationUsers/register-admin`, { username,email, password });
  }
logout(){
  localStorage.removeItem('token');
}

isLoggedIn(){


  let jwthelper=new JwtHelperService();
  let token=localStorage.getItem('token');
  if(!token)
  return null;
 let isExpired=jwthelper.isTokenExpired(token);
 return !isExpired;
}

}
