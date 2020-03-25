import { Component, OnInit, ViewChild } from '@angular/core';
import { Org } from '../models/org';
import { OrgsService } from '../services/orgs.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html',
  styleUrls: ['./orgs.component.css']
})
export class OrgsComponent implements OnInit {

    orgs: Org[];
    selectedOrg: Org;
    displayedColumns: string[] = ['id', 'name', 'groupId', 'desc'];
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
                this.dataSource = new MatTableDataSource(orgs);
                this.dataSource.sort = this.sort;             
            });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }

}