import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EtherscanService } from '../services/etherscan.service';
import { Event } from '../models/event';
import { EventResponse } from '../models/event-response';
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
  colors: Colors = new Colors();
  txRegex: string = "0x[a-z]{64}";
  eventForm: FormGroup;
  nftForm: FormGroup;

  constructor(private ess: EtherscanService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ess.getEvents().subscribe(events => {
      this.events = events;
    });
    this.createFormGroups();
  }

  createFormGroups() {
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required]]
    });
    this.nftForm = this.fb.group({
        hash: ['', [Validators.required]]
      });
  }

  formErrorMsg(value) {
    return this.nftForm.hasError('required', [value]) ? 'Required' : '';
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
      console.log(this.eventData);
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
