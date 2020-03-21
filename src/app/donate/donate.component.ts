import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Web3Service } from '../services/web3.service';

declare let require: any;
const nft_artifacts = require('../../../build/contracts/XFFToken.json');

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})

export class DonateComponent implements OnInit {
  NFT: any;

  constructor(
    private location: Location,
    private web3Service: Web3Service
  ) {}

  ngOnInit(): void {
      this.web3Service.artifactsToContract(nft_artifacts)
      .then((abstract) => {
        this.NFT = abstract;
      });
  }

  goBack(): void {
    this.location.back();
  }
}