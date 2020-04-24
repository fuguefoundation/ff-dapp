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
      { id: 13, name: 'Against Malaria Foundation', evaluatorId: 1, desc: 'Description' },
      { id: 14, name: 'Helen Keller International', evaluatorId: 1, desc: 'Description' },
      { id: 15, name: 'Deworm the World Initiative', evaluatorId: 1, desc: 'Description' },
      { id: 16, name: 'SCI Foundation', evaluatorId: 1, desc: 'Description' },
      { id: 17, name: 'Sightsavers', evaluatorId: 1, desc: 'Description' },
      { id: 18, name: 'END Fund', evaluatorId: 1, desc: 'Description' },
      { id: 19, name: 'Acadia Center', evaluatorId: 2, desc: 'Advancing the Clean Energy Future' },
      { id: 20, name: 'Conservation Foundation of the Gulf Coast', evaluatorId: 2, desc: 'Conservation through education and collaboration' },
      { id: 21, name: 'Grand Teton National Park Foundation', evaluatorId: 2, desc: 'Providing financial support to enhance, preserve and protect Grand Teton National Park' },
      { id: 22, name: 'North Carolina Coastal Federation', evaluatorId: 2, desc: 'Working together for a healthy coast' },
      { id: 23, name: 'Rainforest Trust', evaluatorId: 2, desc: 'Saving Species + Caring for Communities + Protecting Our Planet' },
      { id: 24, name: 'Rose Foundation for Communities and the Environment', evaluatorId: 2, desc: 'Supporting grassroots initiatives that inspire community action to protect the environment, consumers and public health.' },
      { id: 25, name: 'Southern Environmental Law Center', evaluatorId: 2, desc: 'Using the power of law to protect the environment and health of the Southeast' },
      { id: 26, name: 'Texas Parks and Wildlife Foundation', evaluatorId: 2, desc: 'Keeping Texas wild' },
      { id: 27, name: 'Fistula Foundation', evaluatorId: 3, desc: 'Description' },
      { id: 28, name: 'Living Good', evaluatorId: 3, desc: 'Description' },
      { id: 29, name: 'Oxfam', evaluatorId: 3, desc: 'Description' },
      { id: 30, name: 'Population Services International', evaluatorId: 3, desc: 'Description' },
      { id: 31, name: 'Village Enterprise', evaluatorId: 3, desc: 'Description' },
      { id: 32, name: 'Johns Hopkins Center for Health Security', evaluatorId: 4, desc: 'Description' },
      { id: 33, name: 'Biosecurity initiative at Centre for International Security and Cooperation', evaluatorId: 4, desc: 'Description' },
      { id: 34, name: 'Univursa Health', evaluatorId: 4, desc: 'Description' },
      { id: 35, name: 'Development Media International', evaluatorId: 4, desc: 'Description' },
      { id: 36, name: 'Centre for Study of Existential Risk', evaluatorId: 4, desc: 'Description' },
      { id: 37, name: 'Electronic Frontier Foundation', evaluatorId: 5, desc: 'The Electronic Frontier Foundation is the leading nonprofit organization defending civil liberties in the digital world.' },
      { id: 38, name: 'OWASP', evaluatorId: 5, desc: 'The Open Web Application Security Project (OWASP) is a nonprofit foundation that works to improve the security of software.' },
      { id: 39, name: 'Tor Project', evaluatorId: 5, desc: 'To advance human rights and freedoms by creating and deploying free and open source anonymity and privacy technologies, supporting their unrestricted availability and use, and furthering their scientific and popular understanding.' },
      { id: 40, name: 'Wikimedia Foundation', evaluatorId: 5, desc: 'The Wikimedia Foundation, Inc is a nonprofit charitable organization dedicated to encouraging the growth, development and distribution of free, multilingual content, and to providing the full content of these wiki-based projects to the public free of charge.' },
    ];
    const evaluators = [
        { id: 1, name: 'Give Well', desc: 'Description Give Well', color: '#ffffff', image: './assets/images/self-reliance.jpg'},
        { id: 2, name: 'Charity Navigator', desc: 'Description Evaluator 2', color: 'gray', image: './assets/images/group-cliff.png'},
        { id: 3, name: 'The Life You Can Save', desc: 'Description Evaluator 3', color: '#000000', image: './assets/images/woman-veil.png'},
        { id: 4, name: 'COVID-19 | Effective Altruism', desc: 'Description Evaluator 4', color: '#b31121', image: './assets/images/synapses.jpg'},
        { id: 5, name: 'Internet Freedoms', desc: 'Description Evaluator 5', color: '#b31121', image: './assets/images/internet-freedom.jpg'}
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