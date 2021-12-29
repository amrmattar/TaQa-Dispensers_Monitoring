import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-stations',
  templateUrl: './edit-stations.component.html',
  styleUrls: ['./edit-stations.component.css'],
})
export class EditStationsComponent implements OnInit {
  loginForm: any;
  name;
  location;
  stations: any;
  get f() {
    return this.loginForm.controls;
  }

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditStationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.name = data.name;
    this.location = data.location;
    // console.log(this.name);

    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: [''],
    });
  }

  onSubmit(): void {
    // console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      // console.log(this.data);

      this.editstation(this.data.id, this.data).subscribe((res) => {
        alert('Edited Success');
        window.location.reload();
      });
    }

    this.dialogRef.close();
  }
  oncancel() {
    this.dialogRef.close();
  }

  editstation(id: any, obj: any) {
    return this.http.put(`${environment.sourceURL}/stations/${id}`, obj);
  }

  ngOnInit(): void {}
}
export const environment = {
  production: true,
  sourceURL: 'http://20.71.116.162/taqareports/api',
  //sourceURL: 'https://localhost:44378/api',
};
