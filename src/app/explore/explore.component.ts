import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EtherscanService } from '../services/etherscan.service';
import { Event } from '../models/event';
import { EventResponse } from '../models/event-response';
import { LeaderBoard } from '../models/leader-board';
import { Colors } from '../models/colors';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  providers: [EtherscanService]
})
export class ExploreComponent implements OnInit {
  events: Event[];
  eventData: EventResponse[];
  lb: LeaderBoard = new LeaderBoard();
  colors: Colors = new Colors();
  txRegex: string = "0x[a-z]{64}";
  eventForm: FormGroup;
  nftForm: FormGroup;
  kudosForm: FormGroup;

  constructor(private ess: EtherscanService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ess.getEvents().subscribe(events => {
      this.events = events;
    });
    this.createFormGroups();
    this.initLeaderBoard();
  }

  createFormGroups() {
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required]]
    });
    this.nftForm = this.fb.group({
        hash: ['', [Validators.required]]
      });
    this.kudosForm = this.fb.group({
        kudos: ['', [Validators.required]]
      });
  }

  formErrorMsg(value) {
    return this.nftForm.hasError('required', [value]) ? 'Required' : '';
  }

  initLeaderBoard() {
    let _data: Array < any > = [this.events[0].fromBlock, this.events[0].address, this.events[0].topic];
    let data: Array < any > = [this.events[1].fromBlock, this.events[1].address, this.events[1].topic];
    let donorObj = {};
    let nonprofitObj = {};

    this.ess.getEventData(data).subscribe(events => {
        let result = this.ess.processDonationReceived(events);
        for (var i = 0; i < result.length; i++) {
            let valueForKey = result[i].donor in donorObj;
            if(!valueForKey){
              donorObj[result[i].donor] = result[i].amount;
            } else {
              donorObj[result[i].donor] += result[i].amount;
            }
        }
        console.log(donorObj);
        this.setLeaderBoard(donorObj, true);
    });
    this.ess.getEventData(_data).subscribe(events => {
        let result = this.ess.processPaymentDistributed(events);
        for (var i = 0; i < result.length; i++) {
            let valueForKey = result[i].to in nonprofitObj;
            if(!valueForKey){
              nonprofitObj[result[i].to] = result[i].amount;
            } else {
              nonprofitObj[result[i].to] += result[i].amount;
            }
        }
        console.log(nonprofitObj);
        this.setLeaderBoard(nonprofitObj, false);
    });
  }

  setLeaderBoard(obj: Object, state: boolean){
    if(state){
        this.lb.donor = [];
        this.lb.donorAmount = [];
        for (let [key, value] of Object.entries(obj)) {
            this.lb.donor.push(key);
            this.lb.donorAmount.push(Number(value));
        }
    } else {
        this.lb.nonprofit = [];
        this.lb.nonprofitAmount = [];
        for (let [key, value] of Object.entries(obj)) {
            this.lb.nonprofit.push(key);
            this.lb.nonprofitAmount.push(Number(value));
        }
    }
  }

  onEventSelected(index): void {
    let data: Array < any > = [this.events[index].fromBlock, this.events[index].address, this.events[index].topic];
    this.ess.getEventData(data).subscribe(events => {
      switch (this.events[index].name) {
        case "Donation Received":
          this.eventData = this.ess.processDonationReceived(events);
          break;
        case "Payment Distributed":
          this.eventData = this.ess.processPaymentDistributed(events);
          break;
        default:
          console.log('error processing event data');
          break;
      }
    });
  }

  createFugue(hash:string){
    this.colors.hex1 = '#' + hash.substring(2,8);
    this.colors.hex2 = '#' + hash.substring(8,14);
    this.colors.hex3 = '#' + hash.substring(14,20);
    this.colors.hex4 = '#' + hash.substring(20,26);
    this.colors.hex5 = '#' + hash.substring(26,32);
    this.colors.hex6 = '#' + hash.substring(32,38);
    this.colors.hex7 = '#' + hash.substring(38,44);
    this.colors.hex8 = '#' + hash.substring(44,50);
    this.colors.hex9 = '#' + hash.substring(50,56);
    this.colors.hex10 = '#' + hash.substring(56,62);
    console.log(this.colors);
}
}
