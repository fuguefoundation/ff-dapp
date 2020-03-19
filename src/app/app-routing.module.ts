import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { DashboardDetailComponent }   from './dashboard-detail/dashboard-detail.component';
import { OrgsComponent }      from './orgs/orgs.component';
import { OrgDetailComponent }  from './org-detail/org-detail.component';
import { AboutComponent }      from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'group/:id', component: DashboardDetailComponent },
  { path: 'detail/:id', component: OrgDetailComponent },
  { path: 'orgs', component: OrgsComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}