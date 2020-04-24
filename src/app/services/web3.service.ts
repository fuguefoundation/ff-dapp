import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
declare let require: any;
const Web3 = require('web3');
const contract = require('@truffle/contract');
import { DebugService } from './debug.service';
import Notify from 'bnc-notify';
import Onboard from 'bnc-onboard'
import { environment } from 'src/environments/environment';
import { WalletState } from '../models/walletState';

declare let window: any;

@Injectable()
export class Web3Service {
  private web3: any;
  public currentWalletState$ = new Subject<WalletState>();

  //Block Native ONBOARD options
  initializationOptions = {
    dappId: environment.BLOCK_NATIVE_KEY,
    networkId: 5,
    subscriptions: {
        wallet: wallet => {
            this.web3 = new Web3(wallet.provider)
        }
    }
  }

  constructor(private debugService: DebugService) {
    this.blockNativeOnboard(this.initializationOptions);
  }

  public async artifactsToContract(artifacts) {
    if (!this.web3) {
        const delay = new Promise(resolve => setTimeout(resolve, 1000));
        await delay;
        return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    this.log('artifactsToContract called');
    return contractAbstraction;
  }

  private async blockNativeOnboard(options) {
    const onboard = Onboard(options);
    let walletSelected;
    let readyToTransact;
    try {
        walletSelected = await onboard.walletSelect();
    } catch (error) {
        console.log(error);
    }
    if (walletSelected) {
        readyToTransact = await onboard.walletCheck();
    }
    if (walletSelected && readyToTransact){
        this.currentWalletState$.next(onboard.getState());
    } else {
        this.log('No wallet detected');
    }
  }

  public sendTx(options) {
      this.web3.eth.sendTransaction(options).on('transactionHash', function(hash){  
        let notifyInstance = Notify({
            dappId: environment.BLOCK_NATIVE_KEY,
            networkId: 5  
        });
        notifyInstance.hash(hash);
      })
  }

  /** Log a OrgService message with the MessageService */
  private log(message: string) {
    this.debugService.add(`Web3Service: ${message}`);
  }

}