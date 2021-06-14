import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EVENTSDATA } from '../models/events-data';
import { EVENTSVOTEDATA } from '../models/events-data';
import { Event } from '../models/event';
import { EventResponse } from '../models/event-response';
import { EventVote } from '../models/event';
import { EventVoteResponse } from '../models/event-response';
import { DebugService } from './debug.service';
declare let require: any;
const Web3 = require('web3');

@Injectable()
export class EtherscanService {

  private apiKey = environment.ETHERSCAN_API;
  private apiUrl: Array < string > = ["https://api-goerli.etherscan.io/api?module=logs&action=getLogs&fromBlock=", "&toBlock=latest&address=", "&topic0=", "&apikey="];
  private txUrl: string = "https://goerli.etherscan.io/tx/";
  private apiVoteUrl: Array < string > = ["https://api-ropsten.etherscan.io/api?module=logs&action=getLogs&fromBlock=", "&toBlock=latest&address=", "&topic0=", "&apikey="];
  private txVoteUrl: string = "https://ropsten.etherscan.io/tx/";
  private web3;

  constructor(private http: HttpClient, private debugService: DebugService) {
    this.web3 = new Web3();
  }

  /*** DONATION Functions ********************************/

  getEventData(data): Observable < any > {
    let url = this.apiUrl[0] + data[0] + this.apiUrl[1] + data[1] + this.apiUrl[2] + data[2] + this.apiUrl[3] + this.apiKey;
    return this.http.get < any > (url).pipe(
      tap(events => this.log(`fetched events`)),
      catchError(this.handleError('getEventData', []))
    );
  }

  leaderBoard() {

  }

  getEvents(): Observable < Event[] > {
    return of(EVENTSDATA);
  }

  processDonationReceived(data): Array < EventResponse > {
    console.log(data);
    var logArray: EventResponse[] = [];
    for (var i = 0; i < data.result.length; i++) {
      var obj: EventResponse = new EventResponse();
      obj["tx"] = this.txUrl + data.result[i].transactionHash
      obj["donationID"] = this.web3.utils.hexToNumberString('0x' + data.result[i].data.substring(60, 66));
      obj["donor"] = '0x' + data.result[i].topics[1].substring(26, 66);
      obj["amount"] = Number(this.web3.utils.fromWei(this.web3.utils.hexToNumberString('0x' + data.result[i].data.substring(115, 130))));
      obj["evaluatorID"] = this.web3.utils.hexToNumberString('0x' + data.result[i].data.substring(258, 260));
      obj["timestamp"] = this.timeConverter(this.web3.utils.toDecimal(data.result[i].timeStamp));
      logArray.push(obj);
    }
    return logArray;
  }

  processPaymentDistributed(data): Array < EventResponse > {
    console.log(data);
    var logArray: EventResponse[] = [];
    for (var i = 0; i < data.result.length; i++) {
      var obj: EventResponse = new EventResponse();
      obj["tx"] = this.txUrl + data.result[i].transactionHash
      obj["to"] = '0x' + data.result[i].data.substring(26, 66);
      obj["amount"] = Number(this.web3.utils.fromWei(this.web3.utils.hexToNumberString('0x' + data.result[i].data.substring(115, 130))));
      obj["evaluatorID"] = data.result[i].data.substring(193, 194);
      obj["timestamp"] = this.timeConverter(this.web3.utils.toDecimal(data.result[i].timeStamp));
      logArray.push(obj);
    }
    return logArray;
  }

  /*** VOTE Functions ********************************/

  getEventVoteData(data): Observable < any > {
    let url = this.apiVoteUrl[0] + data[0] + this.apiVoteUrl[1] + data[1] + this.apiVoteUrl[2] + data[2] + this.apiVoteUrl[3] + this.apiKey;
    return this.http.get < any > (url).pipe(
      tap(events => this.log(`fetched events`)),
      catchError(this.handleError('getEventData', []))
    );
  }

  getVoteEvents(): Observable < EventVote[] > {
    return of(EVENTSVOTEDATA);
  }

  processNewVoterRequest(data): Array < EventVoteResponse > {
    console.log(data);
    var logArray: EventVoteResponse[] = [];
    for (var i = 0; i < data.result.length; i++) {
      var obj: EventVoteResponse = new EventVoteResponse();
      obj["tx"] = this.txVoteUrl + data.result[i].transactionHash;
      obj["newVoterRequest"] = '0x' + data.result[i].topics[1].substring(26, 66);
      obj["timestamp"] = this.timeConverter(this.web3.utils.toDecimal(data.result[i].timeStamp));
      logArray.push(obj);
    }
    return logArray;
  }

  processElections(data): Array < EventVoteResponse > {
    console.log(data);
    var logArray: EventVoteResponse[] = [];
    for (var i = 0; i < data.result.length; i++) {
      var obj: EventVoteResponse = new EventVoteResponse();
      obj["tx"] = this.txVoteUrl + data.result[i].transactionHash;
      obj["date"] = this.timeConverter(this.web3.utils.hexToNumber('0x' + data.result[i].data.substring(122, 132)));
      obj["electionID"] = data.result[i].data.substring(63, 66);
      obj["timestamp"] = this.timeConverter(this.web3.utils.toDecimal(data.result[i].timeStamp));
      logArray.push(obj);
    }
    return logArray;
  }

  processRole(data): Array < EventVoteResponse > {
    console.log(data);
    var logArray: EventVoteResponse[] = [];
    for (var i = 0; i < data.result.length; i++) {
      var obj: EventVoteResponse = new EventVoteResponse();
      obj["tx"] = this.txVoteUrl + data.result[i].transactionHash;
      obj["registeredAddr"] = '0x' + data.result[i].topics[2].substring(26, 66);
      obj["role"] = data.result[i].topics[1];
      console.log(data.result[i].topics[1]);
      if(obj["role"] == EVENTSVOTEDATA[2].voter){
          obj["voter"] = true;
      } else if (obj["role"] == EVENTSVOTEDATA[2].admin) {
          obj["admin"] = true;
      }
      obj["timestamp"] = this.timeConverter(this.web3.utils.toDecimal(data.result[i].timeStamp));
      logArray.push(obj);
    }
    return logArray;
  }

  processVoterRegister(data): Array < EventVoteResponse > {
    console.log(data);
    var logArray: EventVoteResponse[] = [];
    for (var i = 0; i < data.result.length; i++) {
      var obj: EventVoteResponse = new EventVoteResponse();
      obj["tx"] = this.txVoteUrl + data.result[i].transactionHash;
      obj["voterRegisterAddr"] = '0x' + data.result[i].topics[1].substring(26, 66);
      obj["voterRegisterElection"] = data.result[i].data.substring(63, 66);
      obj["timestamp"] = this.timeConverter(this.web3.utils.toDecimal(data.result[i].timeStamp));
      logArray.push(obj);
    }
    return logArray;
  }

  processVote(data): Array < EventVoteResponse > {
    console.log(data);
    var logArray: EventVoteResponse[] = [];
    for (var i = 0; i < data.result.length; i++) {
      var obj: EventVoteResponse = new EventVoteResponse();
      obj["tx"] = this.txVoteUrl + data.result[i].transactionHash;
      obj["timestamp"] = this.timeConverter(this.web3.utils.toDecimal(data.result[i].timeStamp));
      obj["vote"] = data.result[i].data.substring(65, 66);
      obj["voteElectionID"] = data.result[i].data.substring(127, 130);
      obj["addrVote"] = '0x' + data.result[i].topics[1].substring(26, 66);
      logArray.push(obj);
    }
    return logArray;
  }

  processChangeVote(data): Array < EventVoteResponse > {
    console.log(data);
    var logArray: EventVoteResponse[] = [];
    for (var i = 0; i < data.result.length; i++) {
      var obj: EventVoteResponse = new EventVoteResponse();
      obj["tx"] = this.txVoteUrl + data.result[i].transactionHash;
      obj["timestamp"] = this.timeConverter(this.web3.utils.toDecimal(data.result[i].timeStamp));
      obj["voteChanged"] = data.result[i].data.substring(65, 66);
      obj["changeVoteElectionID"] = data.result[i].data.substring(127, 130);
      obj["addrChangedVote"] = '0x' + data.result[i].topics[1].substring(26, 66);
      logArray.push(obj);
    }
    return logArray;
  }

  processDelegateVote(data): Array < EventVoteResponse > {
    console.log(data);
    var logArray: EventVoteResponse[] = [];
    for (var i = 0; i < data.result.length; i++) {
      var obj: EventVoteResponse = new EventVoteResponse();
      obj["tx"] = this.txVoteUrl + data.result[i].transactionHash;
      obj["timestamp"] = this.timeConverter(this.web3.utils.toDecimal(data.result[i].timeStamp));
      obj["delegateElectionID"] = data.result[i].data.substring(63, 66);
      obj["delegateToAddr"] = '0x' + data.result[i].topics[1].substring(26, 66);
      obj["delegateFromAddr"] = '0x' + data.result[i].topics[2].substring(26, 66);
      logArray.push(obj);
    }
    return logArray;
  }

  processNFTissued(data): Array < EventVoteResponse > {
    console.log(data);
    var logArray: EventVoteResponse[] = [];
    for (var i = 0; i < data.result.length; i++) {
      var obj: EventVoteResponse = new EventVoteResponse();
      obj["tx"] = this.txVoteUrl + data.result[i].transactionHash;
      obj["NFTissuedTo"] = '0x' + data.result[i].topics[2].substring(26, 66);
      obj["tokenID"] = data.result[i].topics[3].substring(62, 66)
      obj["timestamp"] = this.timeConverter(this.web3.utils.toDecimal(data.result[i].timeStamp));
      logArray.push(obj);
    }
    return logArray;
  }

  /*** Utility Functions ********************************/

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

  private handleError < T > (operation = 'operation', result ? : T) {
    return (error: any): Observable < T > => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.debugService.add('EtherscanService: ' + message);
  }
}
