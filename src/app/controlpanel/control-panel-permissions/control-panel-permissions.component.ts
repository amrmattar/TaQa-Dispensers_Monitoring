import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { Browser } from '@syncfusion/ej2-base';
import { Subscription } from 'rxjs';
import { IdentityServiceService } from 'src/app/services/identity-service.service';


@Component({
  selector: 'app-control-panel-permissions',
  templateUrl: './control-panel-permissions.component.html',
  styleUrls: ['./control-panel-permissions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ControlPanelPermissionsComponent implements OnInit {
  @ViewChild('defaultCheck')
  public treeObj: TreeViewComponent;
  @ViewChild('check')
  public checkboxObj: CheckBoxComponent;
  // public hierarchicalData: Object[] = [
  //   {
  //     nodeId: '01',
  //     nodeText: 'Music',
  //     icon: 'folder',
  //     nodeChild: [
  //       {
  //         nodeId: '01-01',
  //         nodeText: 'Gouttes.mp3',
  //         icon: 'audio',
  //         nodeChild: [
  //           { nodeId: '01-01', nodeText: 'Gouttes.mp3', icon: 'audio' },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     nodeId: '02',
  //     nodeText: 'Videos',
  //     icon: 'folder',
  //     nodeChild: [
  //       { nodeId: '02-01', nodeText: 'Naturals.mp4', icon: 'video' },
  //       { nodeId: '02-02', nodeText: 'Wild.mpeg', icon: 'video' },
  //     ],
  //   },
  //   {
  //     nodeId: '03',
  //     nodeText: 'Documents',
  //     icon: 'folder',
  //     nodeChild: [
  //       {
  //         nodeId: '03-01',
  //         nodeText: 'Environment Pollution.docx',
  //         icon: 'docx',
  //       },
  //       {
  //         nodeId: '03-02',
  //         nodeText: 'Global Water, Sanitation, & Hygiene.docx',
  //         icon: 'docx',
  //       },
  //       { nodeId: '03-03', nodeText: 'Global Warming.ppt', icon: 'ppt' },
  //       { nodeId: '03-04', nodeText: 'Social Network.pdf', icon: 'pdf' },
  //       { nodeId: '03-05', nodeText: 'Youth Empowerment.pdf', icon: 'pdf' },
  //     ],
  //   },
  //   {
  //     nodeId: '04',
  //     nodeText: 'Pictures',
  //     icon: 'folder',
  //     expanded: true,
  //     nodeChild: [
  //       {
  //         nodeId: '04-01',
  //         nodeText: 'Camera Roll',
  //         icon: 'folder',
  //         expanded: true,
  //         nodeChild: [
  //           {
  //             nodeId: '04-01-01',
  //             nodeText: 'WIN_20160726_094117.JPG',
  //             image:
  //               'https://ej2.syncfusion.com/demos/src/images/employees/9.png',
  //           },
  //           {
  //             nodeId: '04-01-02',
  //             nodeText: 'WIN_20160726_094118.JPG',
  //             image:
  //               'https://ej2.syncfusion.com/demos/src/images/employees/3.png',
  //           },
  //         ],
  //       },
  //       { nodeId: '04-02', nodeText: 'Wind.jpg', icon: 'images' },
  //       { nodeId: '04-03', nodeText: 'Stone.jpg', icon: 'images' },
  //     ],
  //   },
  //   {
  //     nodeId: '05',
  //     nodeText: 'Downloads',
  //     icon: 'folder',
  //     nodeChild: [
  //       { nodeId: '05-01', nodeText: 'UI-Guide.pdf', icon: 'pdf' },
  //       { nodeId: '05-02', nodeText: 'Tutorials.zip', icon: 'zip' },
  //       { nodeId: '05-03', nodeText: 'Game.exe', icon: 'exe' },
  //       { nodeId: '05-04', nodeText: 'TypeScript.7z', icon: 'zip' },
  //     ],
  //   },
  // ];
  // Data source for TreeView component
  public hierarchicalData: Object[] = [];
  public field: Object ;
  // Enable the checkbox for TreeView
  public showCheckBox = true;
  Permissions: Object;
  RolesPermissions: Object;
  constructor(private apiService: IdentityServiceService) {
    this.apiService.getPermissions().subscribe((Permissions) => {
      this.Permissions = Permissions;
      Object.keys(this.Permissions).forEach((key) => {
        this.Permissions[key].icon = 'folder';
        this.hierarchicalData.push(this.Permissions[key]);
      });
      // this.hierarchicalData.push(this.Permissions);
      console.log(this.hierarchicalData);
    });
    this.apiService.getRolesPermissions().subscribe((RolesPermissions) => {
      this.RolesPermissions = RolesPermissions;
    });
    setTimeout(() => {
      this.field = {
        dataSource: this.hierarchicalData,
        id: 'id',
        text: 'name',
        child: 'nodeChild',
        iconCss: 'icon',
        imageUrl: 'image',
      };
    }, 50);
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
setTimeout(() => {
  
  this.treeObj.refresh()
}, 200);
  }
}
