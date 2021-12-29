import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-machines',
  templateUrl: './edit-machines.component.html',
  styleUrls: ['./edit-machines.component.css'],
})
export class EditMachinesComponent implements OnInit {
  loginForm: any;
  name: any;
  model: any;
  code: any;
  selectedstation!: number;

  get f() {
    return this.loginForm.controls;
  }

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditMachinesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.name = data.name;
    this.model = data.model;
    this.code = data.code;
    // console.log(this.name);

    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      code: ['', Validators.required],
    });
  }

  onSubmit(): void {
    // console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      // console.log(this.data);

      this.editmachine(this.data.id, this.data).subscribe((res) => {
        alert('Edited Success');
        window.location.reload();
      });
    }

    this.dialogRef.close();
  }
  oncancel() {
    this.dialogRef.close();
  }

  editmachine(id: any, obj: any) {
    return this.http.put(`${environment.sourceURL}/machines/${id}`, obj);
  }

  ngOnInit(): void {}
}

export const environment = {
  production: true,
  sourceURL: 'http://20.71.116.162/taqareports/api',
  //sourceURL: 'https://localhost:44378/api',
};
