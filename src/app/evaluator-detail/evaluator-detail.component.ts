import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evaluator } from '../models/evaluator';
import { EvaluatorsService } from '../services/evaluators.service';
import { Orgs } from '../models/orgs';
import { OrgsService } from '../services/orgs.service';
import { DonateService } from '../services/donate.service';
import { ETHPrice } from '../models/eth_price';

declare let window: any;

@Component({
  selector: 'app-evaluator-detail',
  templateUrl: './evaluator-detail.component.html',
  styleUrls: ['./evaluator-detail.component.css']
})

export class EvaluatorDetailComponent implements OnInit {
  evaluator: Evaluator;
  orgs: Orgs = null;
  nonprofits: Array < any > = [];
  numberOfSelectedOrgs: number;
  ethPrice: ETHPrice = null;
  displayedColumns: string[] = ['name', 'desc', 'impact'];
  dataSource: MatTableDataSource < any > ;
  @ViewChild(MatSort, {
    static: true
  }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluatorsService: EvaluatorsService,
    private location: Location,
    private orgsService: OrgsService,
    private donateService: DonateService
  ) {}

  ngOnInit(): void {
    this.getEvaluator();
  }

  getEvaluator(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('_id');
      this.evaluatorsService.getEvaluator(id).subscribe(evaluator => {
        console.log(evaluator);
        this.evaluator = evaluator;
        this.getOrgs();
      });
    });
  }

  getOrgs(): void {
    this.orgsService.getOrgs()
      .subscribe(orgs => {
        this.orgs = orgs;
        this.route.params.subscribe(params => {
          orgs.nonprofits.forEach((o) => {
            if (o.evaluatorId._id == params._id) {
              this.nonprofits.push(o);
            }
          });
          this.numberOfSelectedOrgs = this.nonprofits.length;
          this.dataSource = new MatTableDataSource(this.nonprofits);
          this.dataSource.sort = this.sort;
          this.getETHPrice();
        });
      });
  }

  getETHPrice(): void {
    this.donateService.getETHPrice()
      .subscribe(data => {
        this.ethPrice = data;
      });
  }

  web3Donate(id): void {
    this.router.navigateByUrl('donate/' + id)
  }

  goBack(): void {
    this.location.back();
  }
}