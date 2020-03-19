import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';
//import { Web3Service } from '../services/web3.service';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.css']
})

export class DashboardDetailComponent implements OnInit {
  group: Group;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private location: Location,
    //private web3Service: Web3Service
  ) {}

  ngOnInit(): void {
    this.getGroup();
  }

  getGroup(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(id)
      .subscribe(group => {
          this.group = group;
      });
  }

  metamask(): void {
      console.log('metamask');
  }

  goBack(): void {
    this.location.back();
  }
}