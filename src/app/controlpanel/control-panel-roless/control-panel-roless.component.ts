import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation, ViewChild } from '@angular/core';
import {
  EditService,
  PageService,
  CommandColumnService,
  CommandModel,
  ToolbarItems,
  GridComponent,
} from '@syncfusion/ej2-angular-grids';
import { ActivatedRoute } from '@angular/router';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { IdentityServiceService } from 'src/app/services/identity-service.service';

@Component({
  selector: 'app-control-panel-roless',
  templateUrl: './control-panel-roless.component.html',
  styleUrls: ['./control-panel-roless.component.css'],
  providers: [EditService, PageService, CommandColumnService],
})
export class ControlPanelRolessComponent implements OnInit {
  public activeTab: string;
  public data: Object[];
  public editSettings: Object;
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public editparams: Object;
  public pageSettings: Object;
  public commands: CommandModel[];
  public toolbar: ToolbarItems[] | object;
  @ViewChild('gridRole')
  grid: GridComponent;
  roleName;
  public targetElement: HTMLElement;
  public hidden: Boolean = false;
  roles: Object;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: IdentityServiceService
  ) {
    this.apiService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  ngOnInit(): void {
    this.toolbar = [
      {
        text: 'Add Role',
        tooltipText: 'Click',
        prefixIcon: 'e-expand',
        id: 'Click',
      },
    ];
    // this.data = orderDatas;
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
      allowEditOnDblClick: false,
    };
    this.orderidrules = { required: true };
    this.customeridrules = { required: true };
    this.freightrules = { required: true };
    this.editparams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 5 };
    this.commands = [
      {
        type: 'Delete',
        buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' },
      },
    ];
    this.activatedRoute.params.subscribe((params) => {
      this.activeTab = params['tab'];
    });
  }
  clickHandler(args) {
    this.apiService.DeleteRoles(args.rowData.id).subscribe((x) => {});
  }
  clickHandler2(args: ClickEventArgs): void {
    if (args.item.id === 'Click') {
      this.onOpenDialog1(args);
    }
  }
  @ViewChild('ejDialog1') ejDialog1: DialogComponent;
  public onOpenDialog1 = function (event: any): void {
    this.ejDialog1.show();
  };
  public onOverlayClick: EmitType<object> = () => {
    this.ejDialog1.hide();
  };
  btnClick() {
    let newRole = {
      name: '',
    };
    newRole.name = this.roleName;
    this.apiService.AddRoles(newRole).subscribe((x) => {});

      this.apiService.getRoles().subscribe((roles) => {
        this.roles = roles;
      });
      console.log(this.roles);
      this.grid.refresh();
      this.roleName = '';

    this.ejDialog1.hide();
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
}
