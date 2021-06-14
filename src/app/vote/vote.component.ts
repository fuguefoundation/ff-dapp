import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
// import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web3VoteService } from '../services/web3-vote.service';
import { WalletState } from '../models/walletState';
import { Transaction } from '../models/tx';
import { Election } from '../models/election';
import { Voter } from '../models/voter';
import { Proposal } from '../models/proposal';
import { Contract } from '../models/contract';
import { DialogComponent } from '../services/dialog.component'; 
//import { environment } from 'src/environments/environment';

declare let require: any;
const dialog_data = require('./info.json');
const election_artifacts = require('../../assets/data/elections.json');

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})

export class VoteComponent implements OnInit {
  ELECTION: any;
  public sliderValue: number;
  public sliderDisabled: boolean = true;
  public walletDisabled: boolean = true;
  public walletState: WalletState;
  public tx: Transaction;
  public networkName: String;
  public balanceETH: String;
  public valueInWei: number;

  elecContract: Contract = new Contract();
  election: Election = new Election();
  voter: Voter = new Voter();
  proposal: Proposal = new Proposal();

  newElectionForm: FormGroup;
  registerToVoteForm: FormGroup;
  registerForElectionForm: FormGroup;
  voteForm: FormGroup;
  delegateForm: FormGroup;
  changeVoteForm: FormGroup;
  checkRepForm: FormGroup;
  revokeVoterForm: FormGroup

  constructor(
    // private location: Location,
    // private route: ActivatedRoute,
    private web3VoteService: Web3VoteService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.web3VoteService.artifactsToContract(election_artifacts)
      .then((abstract) => {
        this.ELECTION = abstract;
        this.getContractAddress();
      });
    this.web3VoteService.currentWalletState$.subscribe(state => {
      this.walletState = state;
      console.log(this.walletState);
      this.balanceETH = this.web3VoteService.convertWeiToETH(this.walletState.balance);
      console.log(state);
      this.networkName = this.getNetworkName(this.walletState.network);
    });
    this.web3VoteService.tx$.subscribe(tx => {
      this.tx = tx;
    });
    this.createFormGroups();
  }

  connectWallet(change: boolean): void {
    const result = this.web3VoteService.blockNativeOnboard(change);
    if (result){
        this.sliderDisabled = false;
        this.walletDisabled = false;
    } else {
        this.walletDisabled = true;
        console.log('could not connect wallet');
    }
  }

  /************* FORM FUNCTIONS *************/

  createFormGroups() {
    this.newElectionForm = this.fb.group({
      prop0: ['', [Validators.required]],
      prop1: ['', [Validators.required]],
      deadline: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
    });
    this.registerToVoteForm = this.fb.group({
      addr: ['', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]]
    });
    this.registerForElectionForm = this.fb.group({
      eid: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]]
    });
    this.voteForm = this.fb.group({
      prop: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
      eid: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]]
    });
    this.delegateForm = this.fb.group({
      delegateEID: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
      delegateAddr: ['', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]]
    }); 
    this.changeVoteForm = this.fb.group({
      changeVoteProp: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
      changeVoteEID: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]]
    });
    this.revokeVoterForm = this.fb.group({
      revokeAddr: ['', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]]
    });
  }

  newElectionErrorMsg(value) {
    return this.newElectionForm.hasError('required', [value]) ? 'Required' :
    this.newElectionForm.hasError('pattern', [value]) ? 'Only numbers' : '';
  }

  registerToVoteErrorMsg(value) {
    return this.registerToVoteForm.hasError('required', [value]) ? 'Required' :
    this.registerToVoteForm.hasError('minlength', [value]) ? 'Invalid address' :
    this.registerToVoteForm.hasError('maxlength', [value]) ? 'Invalid address' : '';
  }

  registerForElectionErrorMsg(value) {
    return this.registerForElectionForm.hasError('required', [value]) ? 'Required' :
    this.registerForElectionForm.hasError('pattern', [value]) ? 'Only numbers' : '';
  }

  voteErrorMsg(value) {
    return this.voteForm.hasError('required', [value]) ? 'Required' :
    this.voteForm.hasError('pattern', [value]) ? 'Only numbers' : '';
  }

  delegateErrorMsg(value) {
    return this.delegateForm.hasError('required', [value]) ? 'Required' :
    this.delegateForm.hasError('minlength', [value]) ? 'Invalid address' :
    this.delegateForm.hasError('maxlength', [value]) ? 'Invalid address' :
    this.delegateForm.hasError('pattern', [value]) ? 'Only numbers' : '';
  }

  changeVoteErrorMsg(value) {
    return this.changeVoteForm.hasError('required', [value]) ? 'Required' :
    this.changeVoteForm.hasError('pattern', [value]) ? 'Only numbers' : '';
  }

  revokeVoterErrorMsg(value) {
    return this.revokeVoterForm.hasError('required', [value]) ? 'Required' :
    this.revokeVoterForm.hasError('minlength', [value]) ? 'Invalid address' :
    this.revokeVoterForm.hasError('maxlength', [value]) ? 'Invalid address' : '';
  }

  /************* SET STATE FROM FORM ENTRY *************/

  setProp0(e) {
    console.log('Setting proposal 0: ' + e.target.value);
    this.election.prop0 = e.target.value;
  }

  setProp1(e) {
    console.log('Setting proposal 1: ' + e.target.value);
    this.election.prop1 = e.target.value;
  }

  setDeadline(e) {
    console.log('Setting deadline: ' + e.target.value);
    this.election.unix = e.target.value;
    this.election.date = this.timeConverter(e.target.value);
  }

  setRegisterAddr(e) {
    console.log('Allow address to vote: ' + e.target.value);
    this.election.register = e.target.value;
  }

  setRegisterElecID(e) {
    console.log('Register for election ID: ' + e.target.value);
    this.voter.electionID = e.target.value;
  }

  setRegisterElecAddr(e) {
    console.log('Register address for a specific election: ' + e.target.value);
    this.voter.registerAddr = e.target.value;
  }

  setVoteProposal(e) {
    console.log('Vote for proposal number: ' + e.target.value);
    this.proposal.voteCast = e.target.value;
  }

  setVoteElectionID(e) {
    console.log('Vote in Election ID: ' + e.target.value);
    this.proposal.voteElection = e.target.value;
  }

  setDelegateAddr(e) {
    console.log('Delegate Address: ' + e.target.value);
    this.voter.delegateTo = e.target.value;
  }

  setDelegateElectionID(e) {
    console.log('Delegate Election ID: ' + e.target.value);
    this.voter.delegateElectionID = e.target.value;
  }

  setChangeVoteProposal(e) {
    console.log('Change vote to proposal ' + e.target.value);
    this.voter.changeVoteProposal = e.target.value;
  }

  setChangeVoteElectionID(e) {
    console.log('Change vote for election ' + e.target.value);
    this.voter.changeVoteElectionID = e.target.value;
  }

  setRevokeAddr(e) {
    console.log('Revoke address to vote: ' + e.target.value);
    this.election.revokeAddr = e.target.value;
  }

  /************* CONTRACT FUNCTIONS *************/

  async newVoterRequest(addr: string) {
    console.log('New voter request at address ' + addr);

    try {
      const deployedElection = await this.ELECTION.deployed();
      this.web3VoteService.newVoterRequest(deployedElection, addr);
    } catch (e) {
      console.log(e);
      this.setStatus('Error: Address might already be registered; see log.');
    }
  }

  async newElection() {
    console.log('Creating new election');
    try {
      const deployedElection = await this.ELECTION.deployed();
      this.web3VoteService.newElection(deployedElection, this.election.prop0,
        this.election.prop1, this.election.unix, this.walletState.address);
      
    } catch (e) {
      console.log(e);
      this.setStatus('Error: Admin only; see log.');
    }
  }

  async getElectionInfo(eID: number) {
    console.log('Checking info for Election ' + eID);

    try {
      const deployedElection = await this.ELECTION.deployed();
      const result = await deployedElection.getElectionInfo.call(eID);
      console.log(Number(result[4]));
      this.election.proposal0 = result[0];
      this.election.proposal0Count = Number(result[1]);
      this.election.proposal1 = result[2];
      this.election.proposal1Count = Number(result[3]);
      this.election.show = true;
      this.election.getDate = this.timeConverter(Number(result[4]));
    } catch (e) {
      console.log(e);
      this.setStatus('Error: Check if electionID is valid; see log.');
    }
  }

  async getVoterInfo(eID: number, vAddr: string) {
    console.log('Checking voter info: Election ' + eID + ' with address ' + vAddr);

    try {
      const deployedElection = await this.ELECTION.deployed();
      const result = await deployedElection.getVoterInfo.call(eID, vAddr);
      
      this.voter.weight = result[0];
      this.voter.voted = result[1];
      this.voter.registered = result[2];
      this.voter.hasChangedVote = result[3];
      this.voter.delegate = result[4];
      this.voter.vote = result[5];
      this.voter.show = true;
      console.log(this.voter);
    } catch (e) {
      console.log(e);
      this.setStatus('Error; see log.');
    }
  }

  async registerToVote() {
      console.log('Registering to vote');
      try {
        const deployedElection = await this.ELECTION.deployed();
        await this.web3VoteService.registerToVote(deployedElection, 
            this.election.register, this.walletState.address);
        
      } catch (e) {
        console.log(e);
        this.setStatus('Error: Admin only; see log.');
      }
  }

  async registerForElection() {
      console.log('Registering for an election');
      try {
        const deployedElection = await this.ELECTION.deployed();
        await this.web3VoteService.registerForElection(deployedElection, 
            this.voter.electionID, this.walletState.address);
        
      } catch (e) {
        console.log(e);
        this.setStatus('Error: Address might not be registered to vote; see log.');
      }
  }

  async vote() {
      console.log('Voting!');
      try {
        const deployedElection = await this.ELECTION.deployed();
        await this.web3VoteService.vote(deployedElection, 
            this.proposal.voteCast, this.proposal.voteElection, this.walletState.address);
        
      } catch (e) {
        console.log(e);
        this.setStatus('Error: Check voter information for this electionID; see log.');
      }
  }

  async delegate() {
      console.log('Delegate vote');
      try {
        const deployedElection = await this.ELECTION.deployed();
        await this.web3VoteService.delegate(deployedElection, 
            this.voter.delegateTo, this.voter.delegateElectionID, this.walletState.address);
        
      } catch (e) {
        console.log(e);
        this.setStatus('Error: Check voter information for this electionID; see log.');
      }
  }

  async changeVote() {
      console.log('Changing vote');
      try {
        const deployedElection = await this.ELECTION.deployed();
        await this.web3VoteService.changeVote(deployedElection, 
            this.voter.changeVoteProposal, this.voter.changeVoteElectionID, this.walletState.address);
        
      } catch (e) {
        console.log(e);
        this.setStatus('Error: Check voter information for this electionID; see log');
      }
  }

  async getElectionWinner(eID: number) {
    console.log('Getting winner for election ' + eID);

    try {
      let result = await this.web3VoteService.getBlockStamp();
      console.log(result.timestamp);
      this.election.blockTimestamp = this.timeConverter(result.timestamp);
      const deployedElection = await this.ELECTION.deployed();
      const winner = await deployedElection.winnerName.call(eID);
      this.proposal.winner = winner;
    } catch (e) {
      console.log(e);
      this.setStatus('Error: Check electionID information; see log.');
    }
  }

  async revokeVoter() {
      console.log('Revoking voter access');
      try {
        const deployedElection = await this.ELECTION.deployed();
        await this.web3VoteService.revokeVoter(deployedElection, 
            this.election.revokeAddr, this.walletState.address);
        
      } catch (e) {
        console.log(e);
        this.setStatus('Error: Only admin; see log.');
      }
  }

  getNetworkName(id) {
    switch (id) {
      case 1:
        return 'MainNet';
      case 3:
        return 'Ropsten';
      case 4:
        return 'Rinkeby';
      case 5:
        return 'Goerli';
      case 'localhost':
        return 'localhost';
      case '1337':
        return 'localhost';
      default:
        return 'Unknown';
    }
  }


  async getContractAddress() {
    // if (!this.ELECTION) {
    //   this.setStatus('Not loaded');
    //   return;
    // }

    try {
      const deployedElection = await this.ELECTION.deployed();
      console.log(deployedElection);

      this.elecContract.address = deployedElection.address;

    } catch (e) {
      console.log(e);
      //this.setStatus('Error');
    }
  }

  /************* HELPER FUNCTIONS *************/

  openDialog(index): void {
    let choice;
    for (let i = 0; i < dialog_data.length; i++) {
      if (dialog_data[i].id === index) {
        choice = dialog_data[i];
      }
    }
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        id: choice.id,
        desc: choice.desc,
        call: choice.call
      }
    });
  }

  setStatus(status: string) {
    this.matSnackBar.open(status, null, {
      duration: 3000
    });
  }

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }
  
}