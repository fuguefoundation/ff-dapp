import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Evaluator } from '../models/evaluator';
import { DebugService } from './debug.service';


@Injectable({ providedIn: 'root' })
export class EvaluatorsService {

  private evaluatorsUrl = 'api/evaluators';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private debugService: DebugService) { }

  /** GET evaluators from the server */
  getEvaluators (): Observable<Evaluator[]> {
    return this.http.get<Evaluator[]>(this.evaluatorsUrl)
      .pipe(
        tap(_ => this.log('fetched evaluators')),
        catchError(this.handleError<Evaluator[]>('getEvaluators', []))
      );
  }

  /** GET org by id. Return `undefined` when id not found */
  getEvaluatorNo404<Data>(id: number): Observable<Evaluator> {
    const url = `${this.evaluatorsUrl}/?id=${id}`;
    return this.http.get<Evaluator[]>(url)
      .pipe(
        map(evaluators => evaluators[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} org id=${id}`);
        }),
        catchError(this.handleError<Evaluator>(`getEvaluator id=${id}`))
      );
  }

  /** GET org by id. Will 404 if id not found */
  getEvaluator(id: number): Observable<Evaluator> {
    const url = `${this.evaluatorsUrl}/${id}`;
    return this.http.get<Evaluator>(url).pipe(
      tap(_ => this.log(`fetched evaluator id=${id}`)),
      catchError(this.handleError<Evaluator>(`getEvaluator id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

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
