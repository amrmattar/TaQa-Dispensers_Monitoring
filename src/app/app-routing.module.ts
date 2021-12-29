import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailedStationComponent } from './detailed-station/detailed-station.component';
import { AlarmComponent } from './alarm/alarm.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsTargetComponent } from './settings-target/settings-target.component';
import { ControlRoomComponent } from './control-room/control-room.component';
import { ActiveDispenserComponent } from './active-dispenser/active-dispenser.component';
import { UserAlertSettingsComponent } from './user-alert-settings/user-alert-settings.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './services/authguard.service';
import { ControlpanelComponent } from './controlpanel/controlpanel.component';
import { RoleGuardServiceService as RoleGuard } from '../app/services/role-guard-service.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'dashboard',
    },
  },
  {
    path: 'panel',
    component: ControlpanelComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'operation details',
    },
  },
  {
    path: 'detailed-station/:id',
    component: DetailedStationComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'dashboard',
    },
  },
  {
    path: 'active-dispenser/:id',
    component: ActiveDispenserComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'dashboard',
    },
  },
  {
    path: 'alarm/:id',
    component: AlarmComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'operation details',
    },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'administartion',
    },
  },
  {
    path: 'settings-target',
    component: SettingsTargetComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'adminisartion',
    },
  },
  {
    path: 'control-room',
    component: ControlRoomComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'control room',
    },
  },
  {
    path: 'user-alert-settings',
    component: UserAlertSettingsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'financial details',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    relativeLinkResolution: 'legacy',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
