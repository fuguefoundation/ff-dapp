import { Component, OnInit } from '@angular/core';
import { Evaluator } from '../models/evaluator';
import { EvaluatorsService } from '../services/evaluators.service';

@Component({
  selector: 'app-evaluators',
  templateUrl: './evaluators.component.html',
  styleUrls: [ './evaluators.component.css' ]
})
export class EvaluatorsComponent implements OnInit {
  evaluators: Evaluator[] = [];

  //MatRipple
  centered = false;
  disabled = false;
  unbounded = false;
  radius: number;
  color: string;

  constructor(private evaluatorsService: EvaluatorsService) { }

  ngOnInit() {
    this.getEvaluators();
  }

  getEvaluators(): void {
    this.evaluatorsService.getEvaluators()
      .subscribe(evaluators => {
          console.log(evaluators);
          this.evaluators = evaluators.slice(0, 5)
      });
  }
}