import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';
import { Org } from '../models/org';
import { OrgService } from '../services/org.service';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.css']
})

export class DashboardDetailComponent implements OnInit {
  group: Group;
  orgs: Org[];
  NFT: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private location: Location,
    private orgService: OrgService
  ) {}

  ngOnInit(): void {
    this.getGroup();
  }

  getGroup(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(id)
      .subscribe(group => {
          this.group = group;
          this.getOrgs();           
      });
  }

    getOrgs(): void {
        this.orgService.getOrgs()
            .subscribe(orgs => {
                this.orgs = orgs;
                this.route.params.subscribe(params => {
                    orgs.forEach((o: Org) => {
                      if (o.groupId == params.id) {
                        console.log(o);
                      }
                    });
                  });            
            });
    }

  web3Donate(id): void {
      console.log('metamask');
      this.router.navigateByUrl('donate/' + id)
  }

  goBack(): void {
    this.location.back();
  }
}