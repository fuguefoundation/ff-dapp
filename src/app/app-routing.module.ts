import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EvaluatorsComponent }   from './evaluators/evaluators.component';
import { EvaluatorDetailComponent }   from './evaluator-detail/evaluator-detail.component';
import { DonateComponent }   from './donate/donate.component';
import { OrgsComponent }      from './orgs/orgs.component';
import { OrgDetailComponent }  from './org-detail/org-detail.component';
import { AboutComponent }      from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/evaluators', pathMatch: 'full' },
  { path: 'evaluators', component: EvaluatorsComponent },
  { path: 'evaluators/:id', component: EvaluatorDetailComponent },
  { path: 'donate/:id', component: DonateComponent },
  { path: 'orgs/:id', component: OrgDetailComponent },
  { path: 'orgs', component: OrgsComponent },
  { path: 'about', component: AboutComponent }
];

// const routes: Routes = [
// 	{
// 		path: '',
// 		redirectTo: '/dapp',
// 		pathMatch: 'full'
// 	},
// 	{
// 		path: 'home',
// 		component: HomeComponent,
// 		data: {title: "Home | Fugue Foundation"}
// 	},
// 	{
// 		path: 'dapp',
// 		component: DappComponent,
// 		data: {title: "dApp | Fugue Foundation"}
// 	},
// 	{
// 		path: 'beneficiaries',
// 		component: BeneficiariesComponent,
// 		data: {title: "Beneficiaries | Fugue Foundation"}
// 	},
// 	{
// 		path: 'beneficiary/:id',
// 		component: BeneficiaryDetailComponent,
// 		data: {title: "Beneficiary | Fugue Foundation"}
// 	},
// 	{
// 		path: 'events',
// 		component: EventsComponent,
// 		data: {title: "Events | Fugue Foundation"}
// 	},
// 	{
// 		path: '**',
// 		component: PageNotFoundComponent,
// 		data: {title: "404 | Fugue Foundation"}
// 	}
// ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}