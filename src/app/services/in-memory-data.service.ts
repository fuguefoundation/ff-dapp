import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Org } from '../models/org';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const orgs = [
      { id: 11, name: 'Give Directly', groupId: 1, desc: 'Description' },
      { id: 12, name: 'Malaria Consortium', groupId: 1, desc: 'Description' },
      { id: 13, name: 'Against Malaria Foundation', groupId: 2, desc: 'Description' },
      { id: 14, name: 'Helen Keller International', groupId: 2, desc: 'Description' },
      { id: 15, name: 'Deworm the World Initiative', groupId: 3, desc: 'Description' },
      { id: 16, name: 'SCI Foundation', groupId: 3, desc: 'Description' },
      { id: 17, name: 'Sightsavers', groupId: 4, desc: 'Description' },
      { id: 18, name: 'END Fund', groupId: 4, desc: 'Description' }
    ];
    const groups = [
        { id: 1, name: 'Group 1', desc: 'Description Group 1', color: 'grey'},
        { id: 2, name: 'Group 2', desc: 'Description Group 2', color: 'lightblue'},
        { id: 3, name: 'Group 3', desc: 'Description Group 3', color: 'lightgreen'},
        { id: 4, name: 'Group 4', desc: 'Description Group 4', color: 'brown'}

    ];
    return {orgs, groups};
  }

  // Overrides the genId method to ensure that a org always has an id.
  // If the orgs array is empty,
  // the method below returns the initial number (11).
  // if the orgs array is not empty, the method below returns the highest
  // org id + 1.
  genId(orgs: Org[]): number {
    return orgs.length > 0 ? Math.max(...orgs.map(org => org.id)) + 1 : 11;
  }
}