import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Org } from '../models/org';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const orgs = [
      { id: 11, name: 'Give Directly', evaluatorId: 1, desc: 'Description' },
      { id: 12, name: 'Malaria Consortium', evaluatorId: 1, desc: 'Description' },
      { id: 13, name: 'Against Malaria Foundation', evaluatorId: 2, desc: 'Description' },
      { id: 14, name: 'Helen Keller International', evaluatorId: 2, desc: 'Description' },
      { id: 15, name: 'Deworm the World Initiative', evaluatorId: 3, desc: 'Description' },
      { id: 16, name: 'SCI Foundation', evaluatorId: 3, desc: 'Description' },
      { id: 17, name: 'Sightsavers', evaluatorId: 4, desc: 'Description' },
      { id: 18, name: 'END Fund', evaluatorId: 4, desc: 'Description' }
    ];
    const evaluators = [
        { id: 1, name: 'Evaluator 1', desc: 'Description Evaluator 1', color: '#ffffff'},
        { id: 2, name: 'Evaluator 2', desc: 'Description Evaluator 2', color: 'gray'},
        { id: 3, name: 'Evaluator 3', desc: 'Description Evaluator 3', color: '#000000'},
        { id: 4, name: 'Evaluator 4', desc: 'Description Evaluator 4', color: '#b31121'}

    ];
    return {orgs, evaluators};
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