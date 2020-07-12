import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EVENTSDATA } from '../models/events-data';
import { Event } from '../models/event';
import { EventResponse } from '../models/event-response';
import { DebugService } from './debug.service';
declare let require: any;
const Web3 = require('web3');

@Injectable()
export class EtherscanService {

  private apiKey = environment.ETHERSCAN_API;
  private apiUrl: Array < string > = ["https://api-goerli.etherscan.io/api?module=logs&action=getLogs&fromBlock=", "&toBlock=latest&address=", "&topic0=", "&apikey="];
  private txUrl: string = "https://goerli.etherscan.io/tx/";
  private web3;

  constructor(private http: HttpClient, private debugService: DebugService) {
    this.web3 = new Web3();
  }

  getEventData(data): Observable < any > {
    let url = this.apiUrl[0] + data[0] + this.apiUrl[1] + data[1] + this.apiUrl[2] + data[2] + this.apiUrl[3] + this.apiKey;
    return this.http.get < any > (url).pipe(
      tap(events => this.log(`fetched events`)),
      catchError(this.handleError('getEventData', []))
    );
  }

  getEvents(): Observable < Event[] > {
    return of(EVENTSDATA);
  }

  "0x000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000006f05b59d3b20000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000010200000000000000000000000000000000000000000000000000000000000000"

  processDonationReceived(data): Array < EventResponse > {
    console.log(data);
    var logArray: EventResponse[] = [];
    for (var i = 0; i < data.result.length; i++) {
      var obj: EventResponse = new EventResponse();
      obj["tx"] = this.txUrl + data.result[i].transactionHash
      obj["donationID"] = data.result[i].data.substring(60, 66);
      obj["donor"] = '0x' + data.result[i].topics[1].substring(26, 66);
      obj["amount"] = this.web3.utils.fromWei(this.web3.utils.hexToNumberString('0x' + data.result[i].data.substring(115, 130)));
      obj["evaluatorID"] = this.web3.utils.hexToNumberString('0x' + data.result[i].data.substring(194, 258));
      obj["timestamp"] = this.timeConverter(this.web3.utils.toDecimal(data.result[i].timeStamp));
      logArray.push(obj);
    }
    return logArray;
  }

  processPaymentDistributed(data): Array < EventResponse > {
    var logArray: EventResponse[] = [];
    for (var i = 0; i < data.result.length; i++) {
      var obj: EventResponse = new EventResponse();
      obj["tx"] = this.txUrl + data.result[i].transactionHash
      obj["to"] = '0x' + data.result[i].data.substring(26, 66);
      obj["amount"] = this.web3.utils.fromWei(this.web3.utils.hexToNumberString('0x' + data.result[i].data.substring(115, 130)));
      obj["evaluatorID"] = data.result[i].data.substring(193, 194);
      obj["timestamp"] = this.timeConverter(this.web3.utils.toDecimal(data.result[i].timeStamp));
      logArray.push(obj);
    }
    return logArray;
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
