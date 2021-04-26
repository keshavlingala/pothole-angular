import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/UserGuard';
import { ContractorGuard } from './guards/ContractorGuard';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ApplyComponent } from './modules/user/apply/apply.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    canLoad: [UserGuard],
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'contractor',
    canLoad: [UserGuard, ContractorGuard],
    loadChildren: () =>
      import('./modules/contractor/contractor.module').then(
        (m) => m.ContractorModule
      ),
  },
  {
    path: 'admin',
    canLoad: [UserGuard, ContractorGuard, AdminGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
