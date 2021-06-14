import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Web3Service} from './web3.service';
import {Web3VoteService} from './web3-vote.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    Web3Service,
    Web3VoteService
  ],
  exports: [],
  declarations: []
})
export class UtilsModule {
}
