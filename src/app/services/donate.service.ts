import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ETHPrice } from '../models/eth_price';
import { DebugService } from './debug.service';

@Injectable({ providedIn: 'root' })
export class DonateService {

  private etherscanUrl = "https://api-goerli.etherscan.io/api?module=stats&action=ethprice&apikey=" + environment.ETHERSCAN_API;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(
    private http: HttpClient,
    private debugService: DebugService) {}

  /** GET price from Etherscan API */
  getETHPrice(): Observable<ETHPrice> {
    return this.http.get<ETHPrice>(this.etherscanUrl)
      .pipe(
        tap(_ => this.log('fetched ETH price')),
        catchError(this.handleError<ETHPrice>('getETHPrice', null))
      );
  }

  /** This order corresponds to the evaluatorId in the smart contract **/
  getEvaluatorData() {
      return [
        "5ea59469877c1400249976bf", "5ea4e24e883c0c50c561754e",
        "5ea4e2b7883c0c50c561754f", "5ea4e2ce883c0c50c5617550"
      ]
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError < T > (operation = 'operation', result ? : T) {
    return (error: any): Observable < T > => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a EvaluatorsService message with the DebugService */
  private log(message: string) {
    this.debugService.add(`EvaluatorsService: ${message}`);
  }
}
