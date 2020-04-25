import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evaluator } from '../models/evaluator';
import { EvaluatorsService } from '../services/evaluators.service';
import { Org } from '../models/org';
import { OrgsService } from '../services/orgs.service';

@Component({
  selector: 'app-evaluator-detail',
  templateUrl: './evaluator-detail.component.html',
  styleUrls: ['./evaluator-detail.component.css']
})

export class EvaluatorDetailComponent implements OnInit {
  evaluator: Evaluator;
  orgs: Org[] = [];
  NFT: any;
  displayedColumns: string[] = ['id', 'name', 'evaluatorId', 'desc'];
  dataSource: MatTableDataSource < Org >;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evaluatorsService: EvaluatorsService,
    private location: Location,
    private orgsService: OrgsService
  ) {}

  ngOnInit(): void {
    this.getEvaluator();
  }

  getEvaluator(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.evaluatorsService.getEvaluator(id)
      .subscribe(evaluator => {
        this.evaluator = evaluator;
        this.getOrgs();
      });
  }

  getOrgs(): void {
    this.orgsService.getOrgs()
      .subscribe(orgs => {
        this.route.params.subscribe(params => {
          orgs.forEach((o: Org) => {
            if (o.evaluatorId == params.id) {
              this.orgs.push(o);
            }
          });
          this.dataSource = new MatTableDataSource(this.orgs);
          this.dataSource.sort = this.sort;
        });
      });
  }

  web3Donate(id): void {
    this.router.navigateByUrl('donate/' + id)
  }

  goBack(): void {
    this.location.back();
  }
}