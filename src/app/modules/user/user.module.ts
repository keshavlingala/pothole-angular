import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyComponent } from './apply/apply.component';
import { MaterialModule } from '../../material/material.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'apply',
    component: ApplyComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent, ApplyComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class UserModule {}
