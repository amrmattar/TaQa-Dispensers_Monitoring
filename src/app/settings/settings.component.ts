import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { StationService } from "../services/station/station.service";
import { environment } from "src/environments/environment.prod";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  SettingsForm: FormGroup;
  SettingsForm2: FormGroup;
  idName:any;
  stations:any;
  stationId:number;
  optionId:number;
  temp=[
    {value:2,name:'Inlet Pressure'},
    {value:3,name:'Oil Pressure'},
    {value:4,name:'Stage1 Pressure'},
    {value:5,name:'Stage2 Pressure'},
    {value:6,name:'Stage3 Pressure'},
    {value:7,name:'Stage4 Pressure'},
    {value:8,name:'Stage5 Pressure'},
    {value:9,name:'Discharge Temperature'},
    {value:10,name:'Oil Temperature'},
    {value:11,name:'Stage1 Temperature'},
    {value:12,name:'Stage2 Temperature'},
    {value:13,name:'Stage3 Temperature'},
    {value:14,name:'Stage4 Temperature'},
    {value:15,name:'Stage5 Temperature'},
  ]

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private _Activatedroute:ActivatedRoute,private stationService: StationService,private router: Router) { }

  ngOnInit(): void {
    this.SettingsForm = this.formBuilder.group({
      max: [''],
      min: [''],
      thv: [''],
      wv:['']
  });
    this.SettingsForm2 = this.formBuilder.group({
      max: [''],
      min: [''],
      thv: [''],
      wv:['']
  });
  
  this.getAllStations();
  }
  getAllStations() {
    this.http.get(`${environment.sourceURL}/Stations`).subscribe((Response) => {
      this.stations = JSON.parse(JSON.stringify(Response));
      // this.routeSummary = data.routeSummary;
      //this.processesSummaryList = data.processesSummaryList;
    });
  }
  getMaxMinRead(){
    this.stationService.thv(this.idName,this.stationId)
    .subscribe(
      (res) => {

        this.SettingsForm = this.formBuilder.group({
          max: [JSON.parse(JSON.stringify(res)).max],
          min: [JSON.parse(JSON.stringify(res)).min],
          thv: [JSON.parse(JSON.stringify(res)).thv],
          wv:[JSON.parse(JSON.stringify(res)).warningValue],
      });
      }
    )
  }
  get in() { return this.SettingsForm.controls; }
  getMaxMinRead2(){
    this.stationService.thvReset(this.idName,this.in.max.value,this.in.min.value,this.in.thv.value,this.in.wv.value,this.stationId)
    .subscribe(
      (res) => {
        location.reload();
      }
    )
  }
  getMaxMinRead3(){

    this.stationService.SettingTargets(this.stationId)
    .subscribe(
      (res) => {

        this.SettingsForm2 = this.formBuilder.group({
          max: [JSON.parse(JSON.stringify(res)).salesTarget],
          min: [JSON.parse(JSON.stringify(res)).transactionTarget],
          thv: [JSON.parse(JSON.stringify(res)).valueTarget],
          wv:[JSON.parse(JSON.stringify(res)).valueRate],
      });
      }
    )
  }
  get out() { return this.SettingsForm2.controls; }
  getMaxMinRead4(){
    this.stationService.TargetReset(this.out.max.value,this.out.min.value,this.out.thv.value,this.out.wv.value,this.stationId)
    .subscribe(
      (res) => {
        location.reload();
      }
    )
  }
  redirect() {
    this.router.navigate(['../dashboard']);
  }

}
