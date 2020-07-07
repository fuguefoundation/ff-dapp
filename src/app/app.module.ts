import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './services/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { UtilsModule } from './services/utils.module';

import { AppComponent } from './app.component';
import { OrgsComponent } from './orgs/orgs.component';
import { OrgDetailComponent } from './org-detail/org-detail.component';
import { OrgSearchComponent } from './org-search/org-search.component';
import { DebugComponent } from './debug/debug.component';
import { EvaluatorsComponent } from './evaluators/evaluators.component';
import { EvaluatorDetailComponent } from './evaluator-detail/evaluator-detail.component';
import { AboutComponent } from './about/about.component';
import { DataComponent } from './data/data.component';
import { NavComponent } from './nav/nav.component';
import { DonateComponent } from './donate/donate.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReceiptComponent } from './receipt/receipt.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpClientModule,
    UtilsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //     InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  declarations: [
    AppComponent,
    OrgsComponent,
    OrgDetailComponent,
    DebugComponent,
    EvaluatorsComponent,
    OrgSearchComponent,
    AboutComponent,
    EvaluatorDetailComponent,
    DataComponent,
    NavComponent,
    DonateComponent,
    PageNotFoundComponent,
    ReceiptComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
