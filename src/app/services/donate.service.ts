import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Orgs } from '../models/orgs';
import { Evaluator } from '../models/evaluator';
import { DebugService } from './debug.service';

@Injectable({ providedIn: 'root' })
export class DonateService {

  //private evaluatorsUrl = 'api/evaluators';  // URL to in-memory-data-service api
  private evaluatorsUrl = environment.FF_API_URL + '/evaluators'; // URL to web api
  private orgsUrl = environment.FF_API_URL + '/nonprofits';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private debugService: DebugService) {}

  /** GET evaluator by id. Will 404 if id not found */
  getEvaluator(id: string): Observable < Evaluator > {
    const url = `${this.evaluatorsUrl}/${id}`;
    return this.http.get < Evaluator > (url).pipe(
      tap(_ => this.log(`fetched evaluator id=${id}`)),
      catchError(this.handleError < Evaluator > (`getEvaluator _id=${id}`))
    );
  }

  /** GET orgs from the server */
  getOrgs(): Observable < Orgs > {
    return this.http.get < Orgs > (this.orgsUrl)
      .pipe(
        tap(_ => this.log('fetched orgs')),
        catchError(this.handleError < Orgs > ('getOrgs', null))
      );
  }

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
