import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private orgsService: OrgsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getOrg();
  }

  getOrg(): void {
    this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        this.orgsService.getOrg(id).subscribe(org => {
          this.org = org;
        });
    });
  }

  goBack(): void {
    this.location.back();
  }
}