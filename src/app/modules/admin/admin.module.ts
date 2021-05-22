import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdashboardComponent } from './adashboard/adashboard.component';
import { MaterialModule } from '../../material/material.module';
import { ContractorApplicationsComponent } from './contractor-applications/contractor-applications.component';
import { HomeComponent } from './home/home.component';
import { AdminService } from './admin.service';
import {
  BidsComponent,
  ContractorProfileComponent,
} from './bids/bids.component';
import { UsersComponent } from './users/users.component';

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
      {
        path: 'users',
        component: UsersComponent,
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
    ContractorProfileComponent,
    UsersComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
  providers: [AdminService],
})
export class AdminModule {}
