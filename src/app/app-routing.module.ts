import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EvaluatorsComponent }   from './evaluators/evaluators.component';
import { EvaluatorDetailComponent }   from './evaluator-detail/evaluator-detail.component';
import { DonateComponent }   from './donate/donate.component';
import { OrgsComponent }      from './orgs/orgs.component';
import { OrgDetailComponent }  from './org-detail/org-detail.component';
import { AboutComponent }      from './about/about.component';
import { ReceiptComponent }      from './receipt/receipt.component';
import { PageNotFoundComponent }      from './page-not-found/page-not-found.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/evaluators',
		pathMatch: 'full'
	},
	{
		path: 'evaluators',
		component: EvaluatorsComponent,
		data: {title: "Home | Fugue Foundation"}
	},
	{
		path: 'evaluators/:id',
		component: EvaluatorDetailComponent,
		data: {title: "Evaluator | Fugue Foundation"}
	},
	{
		path: 'donate/:id',
		component: DonateComponent,
		data: {title: "Donations | Fugue Foundation"}
	},
	{
		path: 'orgs',
		component: OrgsComponent,
		data: {title: "Nonprofits | Fugue Foundation"}
	},
    {
		path: 'orgs/:id',
		component: OrgDetailComponent,
		data: {title: "Nonprofit | Fugue Foundation"}
	},
	{
		path: 'about',
		component: AboutComponent,
		data: {title: "About | Fugue Foundation"}
	},
    {
		path: 'receipt',
		component: ReceiptComponent,
		data: {title: "Receipt | Fugue Foundation"}
	},
    {
		path: '**',
		component: PageNotFoundComponent,
		data: {title: "404 | Fugue Foundation"}
	}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}