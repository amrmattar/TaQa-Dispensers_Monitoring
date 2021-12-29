import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditStationsComponent } from './edit-stations/edit-stations.component';
import { EditMachinesComponent } from './edit-machines/edit-machines.component';
import { EditCompressorsComponent } from './edit-compressors/edit-compressors.component';

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ControlpanelComponent implements OnInit, AfterViewInit {
  list_permissions: Array<string> = [];
  formVar!: FormGroup;
  formVar2!: FormGroup;
  formVar3!: FormGroup;
  formVar4!: FormGroup;
  admin: boolean = false;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public deleteDialog: MatDialog,
    public dialog: MatDialog,
    public dialog2: MatDialog,
    private elementRef: ElementRef
  ) {
    this.selectedTab = 'station';
  }
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#F9F5F3;';
  }

  stations: any;
  machines: any;
  compressors: any;
  dispensers: any;
  deletestations: any;
  name: any;
  ngOnInit(): void {
    setTimeout(() => {
      let Permissions = JSON.stringify(
        localStorage.getItem('Permissions_taqa')
      );
      for (let i = 0; i < Permissions.length; i++) {
        if (Permissions.split(',')[i] == undefined) {
          break;
        }
        this.list_permissions.push(
          Permissions.split(',')[i].replace('_', ' ').replace('"', '')
        );
      }
      console.log(this.list_permissions)
      if (
        this.list_permissions.find((e) => e == 'administartion') != undefined
        
      ) {
        this.admin = true;
      }
    }, 100);
    this.formVar = this.fb.group({
      name: '',
      location: '',
      address: '',
    });

    this.formVar2 = this.fb.group({
      name: '',
      code: '',
    });

    this.formVar3 = this.fb.group({
      name: '',
      code: '',
      brokerId: '',
    });

    this.formVar4 = this.fb.group({
      name: '',
      dispenser_No: Number,
    });

    this.getStations().subscribe((s) => {
      this.stations = s;
    });

    this.getMachines().subscribe((s) => {
      this.machines = s;
    });

    this.getCompressors().subscribe((s) => {
      this.compressors = s;
    });

    this.getDispensers().subscribe((s) => {
      this.dispensers = s;
    });
  }
  getStations() {
    return this.http.get(`${environment.sourceURL}/stations`);
  }

  getMachines() {
    return this.http.get(`${environment.sourceURL}/machines`);
  }

  getCompressors() {
    return this.http.get(`${environment.sourceURL}/compressor`);
  }

  getDispensers() {
    return this.http.get(`${environment.sourceURL}/dispensers`);
  }

  onSubmit() {
    return this.http
      .post(`${environment.sourceURL}/stations`, this.formVar.value)
      .subscribe((Response) => {
        // console.log(Response)
        location.reload();
      });
  }

  addMachines() {
    return this.http
      .post(`${environment.sourceURL}/machines`, this.formVar2.value)
      .subscribe((Response) => {
        // console.log(Response)
        location.reload();
      });
  }

  addCompressors() {
    return this.http
      .post(`${environment.sourceURL}/compressor`, this.formVar3.value)
      .subscribe((Response) => {
        // console.log(Response)
        location.reload();
      });
  }

  addDispensers() {
    return this.http
      .post(`${environment.sourceURL}/dispensers`, this.formVar4.value)
      .subscribe((Response) => {
        // console.log(Response)
        location.reload();
      });
  }

  delstation(id: any) {
    return this.http.delete(`${environment.sourceURL}/stations/${id}`);
  }

  ondelStation(s: any) {
    if (confirm('Are you want to delete station')) {
      this.delstation(s).subscribe(() => {
        alert('Deleted Success');
        window.location.reload();
      });
    }
  }

  delmachine(id: any) {
    return this.http.delete(`${environment.sourceURL}/machines/${id}`);
  }

  ondelMachine(s: any) {
    if (confirm('Are you want to delete machine')) {
      this.delmachine(s).subscribe(() => {
        alert('Deleted Success');
        window.location.reload();
      });
    }
  }

  delcompressor(id: any) {
    return this.http.delete(`${environment.sourceURL}/compressor/${id}`);
  }
  ondelCompressor(s: any) {
    if (confirm('Are you want to delete compressor')) {
      this.delcompressor(s).subscribe(() => {
        alert('Deleted Success');
        window.location.reload();
      });
    }
  }

  deldispenser(id: any) {
    return this.http.delete(`${environment.sourceURL}/dispensers/${id}`);
  }
  ondelDispenser(s: any) {
    if (confirm('Are you want to delete dispenser')) {
      this.deldispenser(s).subscribe((_res) => {
        alert('Deleted Success');
        window.location.reload();
      });
    }
  }

  onedit(s: any) {
    const dialogRef = this.dialog.open(EditStationsComponent, {
      width: '50%',
      data: s,
    });
    dialogRef.afterClosed().subscribe((_result) => {
      // console.log('The dialog was closed');
    });
  }

  onedit2(s: any) {
    const dialogRef = this.dialog2.open(EditMachinesComponent, {
      width: '50%',
      data: s,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
    });
  }

  onedit3(s: any) {
    const dialogRef = this.dialog2.open(EditCompressorsComponent, {
      width: '50%',
      data: s,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
    });
  }

  selectedTab: string;
  clicked(s: string) {
    if (s == '1') {
      this.selectedTab = 'station';
    } else if (s == '2') {
      this.selectedTab = 'dispenser';
    } else if (s == '3') {
      this.selectedTab = 'compressor';
    } else if (s == '4') {
      this.selectedTab = 'nozele';
    } else if (s == '5') {
      this.selectedTab = 'user';
    } else if (s == '6') {
      this.selectedTab = 'role';
    }
  }
}
export const environment = {
  production: true,
  sourceURL: 'http://20.71.116.162/taqareports/api',
  //sourceURL: 'https://localhost:44378/api',
};
