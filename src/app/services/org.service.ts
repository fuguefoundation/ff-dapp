import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Org } from '../models/org';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class OrgService {

  private orgsUrl = 'api/orgs';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET orgs from the server */
  getOrgs (): Observable<Org[]> {
    return this.http.get<Org[]>(this.orgsUrl)
      .pipe(
        tap(_ => this.log('fetched orgs')),
        catchError(this.handleError<Org[]>('getOrgs', []))
      );
  }

  /** GET org by id. Return `undefined` when id not found */
  getOrgNo404<Data>(id: number): Observable<Org> {
    const url = `${this.orgsUrl}/?id=${id}`;
    return this.http.get<Org[]>(url)
      .pipe(
        map(orgs => orgs[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} org id=${id}`);
        }),
        catchError(this.handleError<Org>(`getOrg id=${id}`))
      );
  }

  /** GET org by id. Will 404 if id not found */
  getOrg(id: number): Observable<Org> {
    const url = `${this.orgsUrl}/${id}`;
    return this.http.get<Org>(url).pipe(
      tap(_ => this.log(`fetched org id=${id}`)),
      catchError(this.handleError<Org>(`getOrg id=${id}`))
    );
  }

  /* GET orgs whose name contains search term */
  searchOrgs(term: string): Observable<Org[]> {
    if (!term.trim()) {
      // if not search term, return empty org array.
      return of([]);
    }
    return this.http.get<Org[]>(`${this.orgsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found orgs matching "${term}"`) :
         this.log(`no orgs matching "${term}"`)),
      catchError(this.handleError<Org[]>('searchOrgs', []))
    );
  }

  //////// Save methods //////////

  /** POST, DELETE, PUT */

//   addOrg (org: Org): Observable<Org> {
//     return this.http.post<Org>(this.orgsUrl, org, this.httpOptions).pipe(
//       tap((newOrg: Org) => this.log(`added org w/ id=${newOrg.id}`)),
//       catchError(this.handleError<Org>('addOrg'))
//     );
//   }

//   deleteOrg (org: Org | number): Observable<Org> {
//     const id = typeof org === 'number' ? org : org.id;
//     const url = `${this.orgsUrl}/${id}`;

//     return this.http.delete<Org>(url, this.httpOptions).pipe(
//       tap(_ => this.log(`deleted org id=${id}`)),
//       catchError(this.handleError<Org>('deleteOrg'))
//     );
//   }

//   updateOrg (org: Org): Observable<any> {
//     return this.http.put(this.orgsUrl, org, this.httpOptions).pipe(
//       tap(_ => this.log(`updated org id=${org.id}`)),
//       catchError(this.handleError<any>('updateOrg'))
//     );
//   }

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

  /** Log a OrgService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`OrgService: ${message}`);
  }
}
