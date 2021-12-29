import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ControlserviceService {

  constructor(private http:HttpClient) { }
  getstations(){
    return this.http.get(`${environment.sourceURL}/stations`)
  }
  getmachines(){
    return this.http.get(`${environment.sourceURL}/machines`)
  }
  getcompressors(){
    return this.http.get(`${environment.sourceURL}/compressor`)
  }
  getnozzels(){
    return this.http.get(`${environment.sourceURL}/dispensers`)
  }
  editstation(id,obj){
    return this.http.put(`${environment.sourceURL}/stations/${id}`,obj);

  }
  editmachines(id,obj){
    return this.http.put(`${environment.sourceURL}/machines/${id}`,obj);

  }
  editcompressor(id,obj){
    return this.http.put(`${environment.sourceURL}/compressor/${id}`,obj);

  }
  editnozzeles(id,obj){
    return this.http.put(`${environment.sourceURL}/dispensers/${id}`,obj);

  }
  Addstation(name,location){
    return this.http.post(`${environment.sourceURL}/stations`,{name,location})

  }
  AddMachine(name,code,stationId){
    return this.http.post(`${environment.sourceURL}/machines`,{name,code,stationId})

  }
  Addcompressor(name,code,stationId,brokerId){
    return this.http.post(`${environment.sourceURL}/compressor`,{name,code,stationId,brokerId})

  }
  AddNozzele(name,dispenser_No,machineId){
    return this.http.post(`${environment.sourceURL}/dispensers`,{name,dispenser_No,machineId})

  }
  delmachine(id){
    return this.http.delete(`${environment.sourceURL}/machines/${id}`);

  }
  delstation(id){
    return this.http.delete(`${environment.sourceURL}/stations/${id}`);

  }
  delcompressor(id){
    return this.http.delete(`${environment.sourceURL}/compressor/${id}`);

  }
  delnozzele(id){
    return this.http.delete(`${environment.sourceURL}/dispensers/${id}`);

  }
}
