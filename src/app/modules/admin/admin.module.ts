import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdashboardComponent } from './adashboard/adashboard.component';
import { MaterialModule } from '../../material/material.module';
import { ContractorApplicationsComponent } from './contractor-applications/contractor-applications.component';
import { HomeComponent } from './home/home.component';
import { AdminService } from './admin.service';
import { BidsComponent } from './bids/bids.component';

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
      {
        path: 'bids',
        component: BidsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdashboardComponent,
    ContractorApplicationsComponent,
    HomeComponent,
    BidsComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
  providers: [AdminService],
})
export class AdminModule {}
