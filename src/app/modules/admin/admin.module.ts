import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdashboardComponent } from './adashboard/adashboard.component';
import { MaterialModule } from '../../material/material.module';
import { ContractorApplicationsComponent } from './contractor-applications/contractor-applications.component';
import { HomeComponent } from './home/home.component';
import { AdminService } from './admin.service';

const routes: Routes = [
  {
    path: '',
    component: AdashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'contractors',
        component: ContractorApplicationsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdashboardComponent,
    ContractorApplicationsComponent,
    HomeComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
  providers: [AdminService],
})
export class AdminModule {}
