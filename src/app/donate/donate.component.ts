import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Web3Service } from '../services/web3.service';
import { WalletState } from '../models/walletState';
import { Transaction } from '../models/tx';

declare let require: any;
const nft_artifacts = require('../../../build/contracts/XFFToken.json');

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})

export class DonateComponent implements OnInit {
  NFT: any;
  public walletState: WalletState;
  public tx: Transaction;
  public networkName: String;

  constructor(
    private location: Location,
    private web3Service: Web3Service
  ) {}

  ngOnInit(): void {
    this.web3Service.artifactsToContract(nft_artifacts)
      .then((abstract) => {
        this.NFT = abstract;
      });
    this.web3Service.currentWalletState$.subscribe(state => {
        this.walletState = state;
        this.networkName = this.getNetworkName(this.walletState.network);
        console.log(state);
    });
    this.web3Service.tx$.subscribe(tx => {
        this.tx = tx;
        console.log(tx);
    })
  }

  sendTx(): void {
    let temp = {from: this.walletState.address, to: '0x88c98f3eCD2BDc06EE10B191165Cb9924B3F7C4b', value: "1000000"}
    this.web3Service.sendTx(temp);
  }

  goBack(): void {
    this.location.back();
  }

  getNetworkName(id) {
      switch (id) {
          case 1:
              return 'MainNet';  
          case 4:
              return 'Rinkeby';            
          case 5:
              return 'Goerli';         
          case 'localhost':
              return 'localhost'; 
          default:
              return 'Unknown';
      }
  }
}