import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import "rxjs/Rx";
import { environment } from 'src/environments/environment';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
  HttpParams,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CompareService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  //Constructor
  constructor(private http: HttpClient) {}

  getCompareValues(load1, load2) {
    return this.http.get(
      environment.servicesUrl +
        '/TransientReadings/CompareLoadsPhase/' +
        load1 +
        '/' +
        load2
    );
  }
  getCompareChart(load1, load2, time) {
    return this.http.get(
      environment.servicesUrl +
        '/NewPowerReports/CompareLoads/' +
        load1 +
        '/' +
        load2 +
        '/' +
        time
    );
  }

  /*--------------------------HttpErrorHandler----------------------- */
  errorHandler(error: HttpErrorResponse) {
    // console.log(error);
    return Observable.throw(error.status || 'Server Error');
  }
  /*--------------------------HttpErrorHandler----------------------- */
}
