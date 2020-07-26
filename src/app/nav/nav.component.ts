import {ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, RouterEvent } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

/** @title Responsive sidenav */
@Component({
  selector: 'ff-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router,
    private titleService: Title, private activatedRoute: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }))
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event: RouterEvent) => {
        this.titleService.setTitle(event['title']);
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
