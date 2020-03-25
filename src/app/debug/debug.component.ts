import { Component, OnInit } from '@angular/core';
import { DebugService } from '../services/debug.service';

@Component({
  selector: 'ff-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  constructor(public debugService: DebugService) {}

  ngOnInit() {
  }

}