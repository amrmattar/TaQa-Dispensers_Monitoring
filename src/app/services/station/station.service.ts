import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import "rxjs/Rx";
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
export class StationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    }),
  };
  //Constructor
  constructor(private http: HttpClient) {}
  getGetMaxMinReadP() {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetCurrentMaxMinP'
    );
  }
  getGetMaxMinReadT() {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetCurrentMaxMinT'
    );
  }
  getGetMaxMinRead(id) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetMaxMinRead/' + id
    );
  }
  getGetCurrentRead(id) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetCurrentRead/' + id
    );
  }

  getGetAllDesipenser(id, time: number) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/GetAllDesipenser/' +
        id +
        '/' +
        time
    );
  }
  getGetAllStations(time: number) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetAllStations/' + time
    );
  }
  getGetDispenser(id: number, time: number) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetDispenser/' + id + '/' + time
    );
  }
  getGetAllStationsVlaue(time: number) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetAllStationsValue/' + time
    );
  }
  getGetPTReads(time: number) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetPTReads/' + time
    );
  }
  getGetLastRead(id, time: number) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetLastRead/' + id + '/' + time
    );
  }
  getGetStationValue(id, time: number) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetStationValue/' + id + '/' + time
    );
  }
  getGetLastAlarms(id) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetLastAlarms/' + id
    );
  }
  getGetLastAllAlarms(id, type) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/GetLastAllAlarms/' +
        id +
        '/' +
        type
    );
  }
  getGetLastAllAlarmsClass(id, type) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/GetLastAllAlarmsClass/' +
        id +
        '/' +
        type
    );
  }
  getGetAllStatus(id) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetAllStatus/' + id
    );
  }
  getGetHourlyReads(time: number) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/ConsumptionReads/' + time
    );
  }
  getGetHourlyStationReads(id, time: number) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/ConsumptionReadsStation/' +
        id +
        '/' +
        time
    );
  }

  getGetAllDesipenserDate(id, from, to) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/GetAllDesipenserDate/' +
        id +
        '/' +
        from +
        '/' +
        to
    );
  }
  getGetAllStationsDate(from, to) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/GetAllStationsDate/' +
        from +
        '/' +
        to
    );
  }
  getGetDispenserDate(id, from, to) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/GetDispenserDate/' +
        id +
        '/' +
        from +
        '/' +
        to
    );
  }
  getGetAllStationsVlaueDate(from, to) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/GetAllStationsValueDate/' +
        from +
        '/' +
        to
    );
  }
  getGetPTReadsDate(from, to) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetPTReadsDate/' + from + '/' + to
    );
  }
  getGetLastReadDate(id, from, to) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/GetLastReadDate/' +
        id +
        '/' +
        from +
        '/' +
        to
    );
  }
  getGetStationValueDate(id, from, to) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/GetStationValueDate/' +
        id +
        '/' +
        from +
        '/' +
        to
    );
  }
  getGetHourlyReadsDate(from, to) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/ConsumptionReadsDate/' +
        from +
        '/' +
        to
    );
  }
  getGetHourlyReadsStationDate(id, from, to) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/ConsumptionReadsStationDate/' +
        id +
        '/' +
        from +
        '/' +
        to
    );
  }
  resetAlarm(id, type) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/Reset/' + id + '/' + type
    );
  }
  resetSpecific(id) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/ResetSpecific/' + id
    );
  }
  thv(id, stationId) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/THV/' + id + '/' + stationId
    );
  }
  AllClassName() {
    return this.http.get(environment.sourceURL + '/Vechileflows/AllClassName');
  }
  SettingTargets(id) {
    return this.http.get(environment.sourceURL + '/SettingTargets/' + id);
  }
  GetAllUserPre(id) {
    return this.http.get(
      environment.sourceURL + '/Vechileflows/GetAllUserPre/' + id
    );
  }
  RemovePreferences(uid, id) {
    return this.http.delete(
      environment.sourceURL +
        '/Vechileflows/RemovePreferences/' +
        uid +
        '/' +
        id
    );
  }
  NewAlarm(bod) {
    const body = JSON.stringify(bod);

    return this.http.post(
      environment.sourceURL + '/SettingTargets/Alarm',
      body,
      { headers: this.httpOptions.headers }
    );
  }
  AddPreferences(uid, id, bool) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/AddPreferences/' +
        uid +
        '/' +
        id +
        '/' +
        bool
    );
  }
  thvReset(id, max, min, thv, wv, stationId) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/THVReset/' +
        id +
        '/' +
        max +
        '/' +
        min +
        '/' +
        thv +
        '/' +
        wv +
        '/' +
        stationId
    );
  }
  TargetReset(max, min, thv, wv, stationId) {
    return this.http.get(
      environment.sourceURL +
        '/Vechileflows/TargetReset/' +
        max +
        '/' +
        min +
        '/' +
        thv +
        '/' +
        wv +
        '/' +
        stationId
    );
  }

  /*--------------------------HttpErrorHandler----------------------- */
  errorHandler(error: HttpErrorResponse) {
    // console.log(error);
    return Observable.throw(error.status || 'Server Error');
  }
  /*--------------------------HttpErrorHandler----------------------- */
}
