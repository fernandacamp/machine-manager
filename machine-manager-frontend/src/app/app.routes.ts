import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MachineCreateComponent } from './pages/machine-create/machine-create.component';
import { MachineDetailsComponent } from './pages/machine-details/machine-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', title:'Dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'machines/create', component: MachineCreateComponent },
  { path: 'machines/:id/details', component: MachineDetailsComponent },
  { path: 'machines/:id/edit', component: MachineCreateComponent },
  { path: '**', redirectTo: 'dashboard', title: 'Dashboard' }
];
