import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Orgs } from '../models/orgs';
import { OrgsService } from '../services/orgs.service';

@Component({
  selector: 'app-org-search',
  templateUrl: './org-search.component.html',
  styleUrls: [ './org-search.component.css' ]
})
export class OrgSearchComponent implements OnInit {
  orgs$: Observable<Orgs>;
  private searchTerms = new Subject<string>();

  constructor(private orgsService: OrgsService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.orgs$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.orgsService.searchOrgs(term)),
    );
  }
}