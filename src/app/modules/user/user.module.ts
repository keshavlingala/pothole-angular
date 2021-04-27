import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyComponent } from './apply/apply.component';
import { MaterialModule } from '../../material/material.module';
import { MyrecordsComponent } from './myrecords/myrecords.component';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'apply',
        component: ApplyComponent,
      },
      {
        path: 'my',
        component: MyrecordsComponent,
      },
      {
        path: 'upload',
        component: UploadComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    ApplyComponent,
    UploadComponent,
    HomeComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
})
export class UserModule {}
