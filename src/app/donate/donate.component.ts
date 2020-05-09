import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Web3Service } from '../services/web3.service';
import { WalletState } from '../models/walletState';
import { Transaction } from '../models/tx';
import { Evaluator } from '../models/evaluator';
import { Orgs } from '../models/orgs';
import { DonateService } from '../services/donate.service';
import { environment } from 'src/environments/environment';

declare let require: any;
const ff_artifacts = require('../../../build/contracts/FFPaymentSplit.json');

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})

export class DonateComponent implements OnInit {
  NFT: any;
  evaluator: Evaluator;
  private paramsId: string;
  private
  orgs: Orgs;
  public walletState: WalletState;
  public tx: Transaction;
  public networkName: String;
  public valueInWei: number;
  donationForm: FormGroup;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private web3Service: Web3Service,
    private donateService: DonateService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.web3Service.artifactsToContract(ff_artifacts)
      .then((abstract) => {
        this.NFT = abstract;
      });
    this.web3Service.currentWalletState$.subscribe(state => {
      this.walletState = state;
      this.networkName = this.getNetworkName(this.walletState.network);
    });
    this.web3Service.tx$.subscribe(tx => {
      this.tx = tx;
    });
    this.createFormGroups();
    this.getEvaluator();
  }

  createFormGroups() {
    this.donationForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]]
    });
  }

  getEvaluator(): void {
    this.route.paramMap.subscribe(params => {
      this.paramsId = params.get('_id');
      this.donateService.getEvaluator(this.paramsId).subscribe(evaluator => {
        console.log(evaluator);
        this.evaluator = evaluator;
        this.getOrgs();
      });
    });
  }

  getOrgs(): void {
    this.donateService.getOrgs()
      .subscribe(orgs => {
        this.orgs = orgs;
        for (let i = 0; i < orgs.nonprofits.length;) {
          if (orgs.nonprofits[i].evaluatorId._id !== this.paramsId) {
            this.orgs.nonprofits.splice(i, 1);
          } else {
            i++;
          }
        }
        console.log(this.orgs);
      });
  }

  donate(amount): void {
    let evaluatorData: Array <string> = this.donateService.getEvaluatorData();
    let data = this.web3Service.getHexValue(evaluatorData.indexOf(this.paramsId));
    let donation = {
        from: this.walletState.address,
        to: environment.FFPAYMENTSPLIT_ADDR,
        value: amount,
        data: data
    }
    this.web3Service.donate(donation);
  }

  convertETHToWei(value) {
    this.valueInWei = this.web3Service.convertETHToWei(value)
  }

  goBack(): void {
    this.location.back();
  }

  formErrorMsg(value) {
    return this.donationForm.hasError('required', [value]) ? 'Required' : '';
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