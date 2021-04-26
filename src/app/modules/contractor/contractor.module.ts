import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CdashboardComponent } from './cdashboard/cdashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CdashboardComponent,
  },
];

@NgModule({
  declarations: [CdashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ContractorModule {}
