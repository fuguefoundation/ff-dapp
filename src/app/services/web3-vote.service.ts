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
//import { Transaction } from '../models/tx';

const networkIdToUrl = {
    '1': 'https://etherscan.io/tx',
    '3': 'https://ropsten.etherscan.io/tx',
    '5': 'https://goerli.etherscan.io/tx',
    '35': 'localhost'
}

@Injectable()
export class Web3VoteService {
  private web3: any;
  private onboard: any;
  public currentWalletState$ = new Subject<WalletState>();
  public tx$ = new Subject<any>();
  private networkID: number = 3; //3 = Ropsten; 1337 = Ganache

  //Block Native ONBOARD options
  initializationOptions = {
    dappId: environment.BLOCK_NATIVE_KEY,
    networkId: this.networkID,
    darkMode: true,
    subscriptions: {
        wallet: wallet => {
            this.web3 = new Web3(wallet.provider)
            window.localStorage.setItem('ff-dapp-wallet', wallet.name)
        },
        balance: () => {}
    },
    walletSelect: {
        heading: "deVoted",
        wallets: [
            { walletName: 'metamask' },
            { walletName: 'opera' },
            { walletName: "status"},
            { walletName: "coinbase"}
        ]
    },
    walletCheck: [
        { checkName: 'connect' },
        { checkName: 'network' },
        { checkName: 'balance', minimumBalance: '100000' }
    ]
  }

  constructor(private debugService: DebugService) {}

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

  public async blockNativeOnboard(change: boolean): Promise<boolean> {
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
        return true;
    } else {
        this.log('No wallet detected');
        return false;
    }
  }

  public newVoterRequest(instance: any, addr) {
      let self = this;
      instance.requestAccess.sendTransaction( {from:addr}).on('transactionHash', function(hash){  
        let notifyInstance = Notify({
            dappId: environment.BLOCK_NATIVE_KEY,
            networkId: self.networkID
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

  public newElection(instance: any, prop1, prop2, deadline, from) {
      let self = this;
      instance.newElection.sendTransaction(prop1, prop2, deadline, {from:from}).on('transactionHash', function(hash){  
        let notifyInstance = Notify({
            dappId: environment.BLOCK_NATIVE_KEY,
            networkId: self.networkID
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

  public registerToVote(instance: any, addr, from) {
      let self = this;
      instance.registerToVote.sendTransaction(addr, {from:from}).on('transactionHash', function(hash){  
        let notifyInstance = Notify({
            dappId: environment.BLOCK_NATIVE_KEY,
            networkId: self.networkID
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

  public registerForElection(instance: any, eid, from) {
      let self = this;
      instance.registerForElection.sendTransaction(eid, {from:from}).on('transactionHash', function(hash){  
        let notifyInstance = Notify({
            dappId: environment.BLOCK_NATIVE_KEY,
            networkId: self.networkID
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

  public vote(instance: any, prop, eid, from) {
      let self = this;
      instance.vote.sendTransaction(prop, eid, {from:from}).on('transactionHash', function(hash){  
        let notifyInstance = Notify({
            dappId: environment.BLOCK_NATIVE_KEY,
            networkId: self.networkID
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

  public delegate(instance: any, addr, eid, from) {
      let self = this;
      instance.delegateVote.sendTransaction(addr, eid, {from:from}).on('transactionHash', function(hash){  
        let notifyInstance = Notify({
            dappId: environment.BLOCK_NATIVE_KEY,
            networkId: self.networkID
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

  public changeVote(instance: any, prop, eid, from) {
      let self = this;
      instance.changeVote.sendTransaction(prop, eid, {from:from}).on('transactionHash', function(hash){  
        let notifyInstance = Notify({
            dappId: environment.BLOCK_NATIVE_KEY,
            networkId: self.networkID
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

  public revokeVoter(instance: any, addr, from) {
      let self = this;
      instance.revokeVoter.sendTransaction(addr, {from:from}).on('transactionHash', function(hash){  
        let notifyInstance = Notify({
            dappId: environment.BLOCK_NATIVE_KEY,
            networkId: self.networkID
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

  async getBlockStamp() {
      let block = await this.web3.eth.getBlockNumber().then(res =>{
        return this.web3.eth.getBlock(res);
      });
      return block;
  }

  /** Add 1 because of zero index and return its hex value for msg.data */
  public getHexValue(index: number) {
      let evalId = index + 1;
      return this.web3.utils.toHex(evalId);
  }

  public convertETHToWei(amount) {
    return this.web3.utils.toWei(amount, 'ether');
  }

  public convertWeiToETH(amount) {
      console.log(amount);
    return this.web3.utils.fromWei(amount, 'ether');
  }

  /** Log a OrgService message with the MessageService */
  private log(message: string) {
    this.debugService.add(`Web3Service: ${message}`);
  }

}