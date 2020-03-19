import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Org } from '../models/org';
import { OrgService } from '../services/org.service';

@Component({
  selector: 'app-org-detail',
  templateUrl: './org-detail.component.html',
  styleUrls: ['./org-detail.component.css']
})
export class OrgDetailComponent implements OnInit {
  org: Org;

  constructor(
    private route: ActivatedRoute,
    private orgService: OrgService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getOrg();
  }

  getOrg(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.orgService.getOrg(id)
      .subscribe(org => this.org = org);
  }

  goBack(): void {
    this.location.back();
  }
}