import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
                //this.orgs = orgs;
                this.route.params.subscribe(params => {
                    orgs.forEach((o: Org) => {
                      if (o.evaluatorId == params.id) {
                          this.orgs.push(o);
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