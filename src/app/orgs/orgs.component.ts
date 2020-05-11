import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Org } from '../models/org';
import { OrgsService } from '../services/orgs.service';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html',
  styleUrls: ['./orgs.component.css']
})
export class OrgsComponent implements OnInit {

    orgs: Org[];
    displayedColumns: string[] = ['name', 'evaluator', 'short_desc', 'url'];
    dataSource: MatTableDataSource<Org>;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private orgsService: OrgsService) { }
  
    ngOnInit() {
        this.getOrgs();
    }

    getOrgs(): void {
        this.orgsService.getOrgs()
            .subscribe(orgs => {
                this.orgs = orgs;
                this.orgs = this.orgsService.shuffle(orgs);
                console.log(this.orgs);
                this.dataSource = new MatTableDataSource(this.orgs);
                this.dataSource.sort = this.sort;
            });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }

}