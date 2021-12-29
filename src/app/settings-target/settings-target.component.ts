import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { StationService } from "../services/station/station.service";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: 'app-settings-target',
  templateUrl: './settings-target.component.html',
  styleUrls: ['./settings-target.component.css']
})
export class SettingsTargetComponent implements OnInit {
  SettingsForm: FormGroup;
  idName:any;
  constructor(private formBuilder: FormBuilder,private _Activatedroute:ActivatedRoute,private stationService: StationService,private router: Router) { }

  ngOnInit(): void {
    this.SettingsForm = this.formBuilder.group({
      max: [''],
      min: [''],
      thv: [''],
      wv:['']
  });
  //this.getMaxMinRead();
  }
  // getMaxMinRead(){

  //   this.stationService.SettingTargets()
  //   .subscribe(
  //     (res) => {

  //       this.SettingsForm = this.formBuilder.group({
  //         max: [JSON.parse(JSON.stringify(res)).salesTarget],
  //         min: [JSON.parse(JSON.stringify(res)).transactionTarget],
  //         thv: [JSON.parse(JSON.stringify(res)).valueTarget],
  //         wv:[JSON.parse(JSON.stringify(res)).valueRate],
  //     });
  //     }
  //   )
  // }
  get in() { return this.SettingsForm.controls; }
  // getMaxMinRead2(){
  //   this.stationService.TargetReset(this.in.max.value,this.in.min.value,this.in.thv.value,this.in.wv.value)
  //   .subscribe(
  //     (res) => {
  //       location.reload();
  //     }
  //   )
  // }
  redirect() {
    this.router.navigate(['../dashboard']);

  }

}
