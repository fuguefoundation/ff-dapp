import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Org } from '../models/org';
import { OrgsService } from '../services/orgs.service';

@Component({
  selector: 'app-org-detail',
  templateUrl: './org-detail.component.html',
  styleUrls: ['./org-detail.component.css']
})
export class OrgDetailComponent implements OnInit {
  org: Org;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orgsService: OrgsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getOrg();
  }

  getOrg(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.orgsService.getOrg(id)
      .subscribe(org => {
          this.org = org;
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