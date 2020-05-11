import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evaluator } from '../models/evaluator';
import { EvaluatorsService } from '../services/evaluators.service';
import { Org } from '../models/org';
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
  orgs: Org[] = [];
  numberOfSelectedOrgs: number;
  ethPrice: ETHPrice = null;
  displayedColumns: string[] = ['name', 'desc', 'impact'];
  dataSource: MatTableDataSource < Org > ;
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
      const id = params.get('id');
      this.evaluatorsService.getEvaluator(id).subscribe(evaluator => {
        this.evaluator = evaluator;
        this.getOrgs();
      });
    });
  }

  getOrgs(): void {
    this.orgsService.getOrgs()
      .subscribe(orgs => {
          console.log(orgs);

        this.route.params.subscribe(params => {
          this.orgs = orgs.filter(o =>{
              return o.evaluatorId._id == params.id;
          });
          console.log(this.orgs);
          this.numberOfSelectedOrgs = this.orgs.length;
          this.dataSource = new MatTableDataSource(this.orgs);
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

  web3Donate(id: string): void {
    this.router.navigateByUrl('donate/' + id)
  }

  goBack(): void {
    this.location.back();
  }
}