import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataUtil } from '@syncfusion/ej2-data';
import { MouseEventArgs } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import {
  EditSettingsModel,
  ToolbarItems,
  GridComponent,
  DialogEditEventArgs,
  RowDataBoundEventArgs,
} from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { IdentityServiceService } from 'src/app/services/identity-service.service';

@Component({
  selector: 'app-control-panel-users',
  templateUrl: './control-panel-users.component.html',
  styleUrls: ['./control-panel-users.component.css'],
})
export class ControlPanelUsersComponent implements OnInit {
  asd: string = '';
  email: string;
  newPassord: string;
  roleName;
  public selectedItem: string;
  public data: Object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[] | object;
  public targetElement: HTMLElement;
  public hidden: Boolean = false;
  // public users: any[];
  public shipCountryDistinctData: Object;
  @ViewChild('grid')
  grid: GridComponent;
  @ViewChild('orderForm')
  orderForm: FormGroup;
  @ViewChild('tab')
  tabObj: any;
  users: Object;
  roles: Object;
  arrayOfName: any = [];
  emailFlag: any;

  ngOnInit(): void {
    // this.data = data;
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
    };
    this.toolbar = ['Add'];

    // this.shipCountryDistinctData = DataUtil.distinct(data, 'ShipCountry', true);
  }

  moveNext() {
    if (this.orderForm.valid) {
      this.tabObj.select(1);
    }
  }
  submitBtn() {
    if (this.orderForm.valid) {
      this.grid.endEdit();
    }
  }
  btnClick1(args) {
    // alert('hi');
    // Edit the seleted row
    // this.grid.selectRow(10000000);
    setTimeout(() => {
      this.grid.startEdit();
      this.grid.clearSelection();
    }, 50);
  }

  constructor(private apiService: IdentityServiceService) {
    this.arrayOfName = new Array();
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.apiService.getRoles().subscribe((roles) => {
      this.roles = roles;
      Object.keys(this.roles).forEach((key) => {
        this.arrayOfName.push(this.roles[key].name);
      });
      console.log(this.roles);
    });
  }
  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'Click') {
      // this.onOpenDialog1(args);
    } else if (args.item.id === 'deleteClick') {
      this.onOpenDialog2(args);
    }
  }
  onUsersEdit(evt) {
    this.emailFlag = evt.requestType;
    let editUser = {
      id: '',
      firstName: '',
      lastName: '',
      role: '',
    };
    let newuser = {
      id: '',
      firstName: '',
      lastName: '',
      role: '',
      email: '',
    };
    let newPassword = {
      userId: '',
      currentPassword: '',
      newPassword: '',
    };
    if (
      evt.requestType == 'save' &&
      this.email == undefined &&
      this.newPassord == undefined &&
      evt.data.id != undefined
    ) {
      debugger;
      editUser.id = evt.data.id;
      editUser.firstName = evt.data.firstName;
      editUser.lastName = evt.data.lastName;
      editUser.role = this.selectedItem;
      this.apiService.putEditUsers(editUser).subscribe((x) => {});
    } else if (evt.requestType == 'save' && this.newPassord == undefined) {
      debugger;
      newuser.id = evt.data.id;
      newuser.firstName = evt.data.firstName;
      newuser.lastName = evt.data.lastName;
      newuser.role = this.selectedItem;
      newuser.email = evt.data.email;
      this.apiService.putUsers(newuser).subscribe((x) => {});
      this.email = undefined;
    } else if (evt.requestType == 'save' && this.newPassord != undefined) {
      debugger;
      console.log(this.newPassord);
      newPassword.userId = evt.data.id;
      newPassword.currentPassword = '12345678';
      newPassword.newPassword = this.newPassord;
      this.apiService.putChangePassword(newPassword).subscribe((x) => {});
    }
  }

  @ViewChild('ejDialog2') ejDialog2: DialogComponent;
  public onOpenDialog2 = function (event: any): void {
    this.ejDialog2.show();
  };
  public onOverlayClick: EmitType<object> = () => {
    this.ejDialog2.hide();
  };

  btnClickdeleteRole() {
    Object.keys(this.roles).forEach((key) => {
      if (this.roles[key].name == this.selectedItem) {
        console.log(this.roles[key].id);
        this.apiService.DeleteRoles(this.roles[key].id).subscribe((x) => {});
      }
    });
    this.ejDialog2.hide();
  }
}
