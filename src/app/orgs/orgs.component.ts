import { Component, OnInit } from '@angular/core';
import { Org } from '../models/org';
import { OrgService } from '../services/org.service';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html',
  styleUrls: ['./orgs.component.css']
})
export class OrgsComponent implements OnInit {

    orgs: Org[];
  
    constructor(private orgService: OrgService) { }
  
    ngOnInit() {
        this.getOrgs();
    }

    getOrgs(): void {
        this.orgService.getOrgs()
            .subscribe(orgs => this.orgs = orgs);
    }

}