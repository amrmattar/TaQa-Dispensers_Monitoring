import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CircularGaugeAllModule } from '@syncfusion/ej2-angular-circulargauge';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgApexchartsModule } from 'ng-apexcharts';
//import { DetailedStationComponent } from './detailed-station/detailed-station.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './generic-comp/side-nav/side-nav.component';
import { MenuListItemComponent } from './generic-comp/menu-list-item/menu-list-item.component';
import { DetailedStationComponent } from './detailed-station/detailed-station.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AlarmComponent } from './alarm/alarm.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { SettingsComponent } from './settings/settings.component';
import { ControlRoomComponent } from './control-room/control-room.component';
import { SettingsTargetComponent } from './settings-target/settings-target.component';
import { ActiveDispenserComponent } from './active-dispenser/active-dispenser.component';
import { UserAlertSettingsComponent } from './user-alert-settings/user-alert-settings.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ToastrModule } from 'ngx-toastr';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthguardService } from './services/authguard.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { EditStationsComponent } from './controlpanel/edit-stations/edit-stations.component';
import { EditCompressorsComponent } from './controlpanel/edit-compressors/edit-compressors.component';
import { EditMachinesComponent } from './controlpanel/edit-machines/edit-machines.component';
import { CommonModule } from '@angular/common';
import { ControlpanelComponent } from './controlpanel/controlpanel.component';
import { IframeComponent } from './iframe/iframe.component';
import { RadarChartComponent } from './dashboard/radar-chart/radar-chart.component';
import { ListChartComponent } from './dashboard/list-chart/list-chart.component';
import { DashboardCardsComponent } from './dashboard/dashboard-cards/dashboard-cards.component';
import {
  ListViewAllModule,
  ListViewModule,
} from '@syncfusion/ej2-angular-lists';
import {
  ButtonModule,
  RadioButtonModule,
  CheckBoxModule,
  SwitchModule,
  CheckBoxAllModule,
} from '@syncfusion/ej2-angular-buttons';
import {
  DatePickerModule,
  DatePickerAllModule,
} from '@syncfusion/ej2-angular-calendars';
import {
  DropDownListModule,
  DropDownListAllModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { GridModule, GridAllModule, EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import {
  NumericTextBoxAllModule,
  ColorPickerModule,
  SliderModule,
} from '@syncfusion/ej2-angular-inputs';
import {
  SidebarModule,
  MenuAllModule,
  TreeViewAllModule,
  ToolbarModule,
  TabAllModule,
  TreeViewModule,
} from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { ControlPanelUsersComponent } from './controlpanel/control-panel-users/control-panel-users.component';
import { ControlPanelRolessComponent } from './controlpanel/control-panel-roless/control-panel-roless.component';
import { ControlPanelPermissionsComponent } from './controlpanel/control-panel-permissions/control-panel-permissions.component';

export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    MenuListItemComponent,
    DashboardComponent,
    ControlpanelComponent,
    DetailedStationComponent,

    AlarmComponent,
    SettingsComponent,
    ControlRoomComponent,
    SettingsTargetComponent,

    ActiveDispenserComponent,
    UserAlertSettingsComponent,
    LoginComponent,
    RegisterComponent,
    EditStationsComponent,
    EditCompressorsComponent,
    EditMachinesComponent,
    IframeComponent,
    RadarChartComponent,
    ListChartComponent,
    DashboardCardsComponent,
    ControlPanelUsersComponent,
    ControlPanelRolessComponent,
    ControlPanelPermissionsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CircularGaugeAllModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    NgxMaterialTimepickerModule,
    CommonModule,
    BrowserModule,
    //DashboardComponent,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 10,
      innerStrokeWidth: 0,
      outerStrokeColor: '#d63384',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
    NgApexchartsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    NgxMatNativeDateModule,
    OAuthModule.forRoot(),

    ToastrModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts,
    }),
    Ng5SliderModule,
    MatCheckboxModule,
    MatDialogModule,
    ButtonModule,
    SidebarModule,
    RadioButtonModule,
    MenuAllModule,
    DropDownListModule,
    ButtonModule,
    TreeViewAllModule,
    FormsModule,
    DatePickerModule,
    GridModule,
    CommonModule,
    ToolbarModule,
    GridAllModule,
    NumericTextBoxAllModule,
    DialogModule,
    DatePickerAllModule,
    DropDownListAllModule,
    ReactiveFormsModule,
    CheckBoxModule,
    DashboardLayoutModule,
    SwitchModule,
    NgApexchartsModule,
    ColorPickerModule,
    SliderModule,

    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    SidebarModule,
    RadioButtonModule,
    MenuAllModule,
    ButtonModule,
    TreeViewAllModule,
    ListViewAllModule,
    DropDownButtonModule,
    DatePickerModule,
    GridModule,
    CommonModule,
    ToolbarModule,
    GridAllModule,
    NumericTextBoxAllModule,
    DialogModule,
    DatePickerAllModule,
    CheckBoxModule,
    SwitchModule,
    ColorPickerModule,
    SliderModule,

    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ToolbarModule,
    GridAllModule,
    BrowserModule,
    NumericTextBoxAllModule,
    DialogModule,
    DatePickerAllModule,
    DropDownListAllModule,
    ReactiveFormsModule,
    FormsModule,
    CheckBoxModule,
    ButtonModule,
    CheckBoxAllModule,
    TabAllModule,
    GridModule,
    CheckBoxModule,
    ListViewModule,
    TreeViewModule,
    DropDownListModule,
  ],
  providers: [
    EditService,
    ToolbarService,
    AuthguardService,
    { provide: OAuthStorage, useFactory: storageFactory },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
