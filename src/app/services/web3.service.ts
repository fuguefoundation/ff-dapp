import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
declare let require: any;
const Web3 = require('web3');
//const contract = require('@truffle/contract');
import { DebugService } from './debug.service';
import Notify from 'bnc-notify';
import Onboard from 'bnc-onboard'
import { environment } from 'src/environments/environment';
import { WalletState } from '../models/walletState';
//import { Transaction } from '../models/tx';

const networkIdToUrl = {
    '1': 'https://etherscan.io/tx',
    '5': 'https://goerli.etherscan.io/tx'
}

@Injectable()
export class Web3Service {
  private web3: any;
  private onboard: any;
  public currentWalletState$ = new Subject<WalletState>();
  public tx$ = new Subject<any>();

  //Block Native ONBOARD options
  initializationOptions = {
    dappId: environment.BLOCK_NATIVE_KEY,
    networkId: 5,
    darkMode: true,
    subscriptions: {
        wallet: wallet => {
            this.web3 = new Web3(wallet.provider)
            window.localStorage.setItem('ff-dapp-wallet', wallet.name)
        },
        balance: () => {}
    },
    walletSelect: {
        heading: "Donation Prep",
        wallets: [
            { walletName: 'metamask' },
            { walletName: 'authereum' },
            { walletName: 'opera' },
            { walletName: "dapper"}
        ]
    },
    walletCheck: [
        { checkName: 'connect' },
        { checkName: 'network' },
        { checkName: 'balance', minimumBalance: '100000' }
    ]
  }

  constructor(private debugService: DebugService) {}

//   public async artifactsToContract(artifacts) {
//     if (!this.web3) {
//         const delay = new Promise(resolve => setTimeout(resolve, 1000));
//         await delay;
//         return await this.artifactsToContract(artifacts);
//     }

//     const contractAbstraction = contract(artifacts);
//     contractAbstraction.setProvider(this.web3.currentProvider);
//     this.log('artifactsToContract called');
//     return contractAbstraction;
//   }

  public async blockNativeOnboard(change: boolean) {
    if(change){
        window.localStorage.removeItem('ff-dapp-wallet');
    }
    if (this.onboard == undefined) {
        this.onboard = Onboard(this.initializationOptions);
    }
    let walletSelected: boolean, readyToTransact: boolean;
    const previouslySelectedWallet = window.localStorage.getItem('ff-dapp-wallet')
    try {
        if (previouslySelectedWallet != null) {
            walletSelected = await this.onboard.walletSelect(previouslySelectedWallet);
        } else {
            walletSelected = await this.onboard.walletSelect();
        }
    } catch (error) {
        console.log(error);
    }
    if (walletSelected) {
        readyToTransact = await this.onboard.walletCheck();
    }
    if (walletSelected && readyToTransact){
        this.currentWalletState$.next(this.onboard.getState());
    } else {
        this.log('No wallet detected');
    }
  }

  public donate(options) {
      let self = this;
      this.web3.eth.sendTransaction(options).on('transactionHash', function(hash){  
        let notifyInstance = Notify({
            dappId: environment.BLOCK_NATIVE_KEY,
            networkId: 5
        });
        const { emitter } = notifyInstance.hash(hash);
        emitter.on('all', function(tx) {
            self.tx$.next(tx);
            setTimeout(() => {
                self.currentWalletState$.next(self.onboard.getState())}, 
                8000
            );
            return {
                onclick: () => window.open(`${networkIdToUrl[self.initializationOptions.networkId]}/${tx.hash}`)
            }          
        });
      })
  }

  public getWeb3(): any {
    return this.web3;
  }

  /** Add 1 because of zero index and return its hex value for msg.data */
  public getHexValue(index: number) {
      let evalId = index + 1;
      return this.web3.utils.toHex(evalId);
  }

  public convertETHToWei(amount: number) {
    return this.web3.utils.toWei(amount, 'ether');
  }

  /** Log a OrgService message with the MessageService */
  private log(message: string) {
    this.debugService.add(`Web3Service: ${message}`);
  }

}