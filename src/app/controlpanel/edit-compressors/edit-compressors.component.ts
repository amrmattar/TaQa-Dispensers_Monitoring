import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-compressors',
  templateUrl: './edit-compressors.component.html',
  styleUrls: ['./edit-compressors.component.css'],
})
export class EditCompressorsComponent implements OnInit {
  loginForm: any;
  name;
  code;
  broker: any;
  station: any;
  get f() {
    return this.loginForm.controls;
  }

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditCompressorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.name = data.name;
    this.code = data.code;
    this.broker = data.broker;
    this.station = this.station;

    // console.log(this.name);

    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      broker: ['', Validators.required],
      station: [0, Validators.required],
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
    return this.http.put(`${environment.sourceURL}/compressor/${id}`, obj);
  }

  ngOnInit(): void {}
}

export const environment = {
  production: true,
  sourceURL: 'http://20.71.116.162/taqareports/api',
  //sourceURL: 'https://localhost:44378/api',
};
