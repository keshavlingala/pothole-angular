import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CdashboardComponent } from './cdashboard/cdashboard.component';
import { MaterialModule } from '../../material/material.module';
import { ContractsComponent } from './contracts/contracts.component';
import { HomeComponent } from './home/home.component';
import { ContractorService } from './contractor.service';
import { ContractDetailComponent } from './contracts/contract-detail/contract-detail.component';
import { MybidsComponent } from './mybids/mybids.component';
import { MyContractsComponent } from './my-contracts/my-contracts.component';

const routes: Routes = [
  {
    path: '',
    component: CdashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'bids',
        component: MybidsComponent,
      },
      {
        path: 'contracts',
        component: ContractsComponent,
        children: [
          {
            path: ':id',
            component: ContractDetailComponent,
          },
        ],
      },
      {
        path: 'my',
        component: MyContractsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    CdashboardComponent,
    ContractsComponent,
    HomeComponent,
    ContractDetailComponent,
    MybidsComponent,
    MyContractsComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  providers: [ContractorService],
})
export class ContractorModule {}
