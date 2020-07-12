import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
declare var ga: Function;

@Injectable()
export class AnalyticsService {

  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      try {
        if (typeof ga === 'function') {
          if (event instanceof NavigationEnd) {
            ga('set', 'page', event.urlAfterRedirects);
            ga('send', 'pageview');
          }
        }
      } catch (e) {
        console.log(e);
      }
    });

  }

  public emitEvent(eventCategory: string,
   eventAction: string,
   eventLabel: string = null,
   eventValue: number = null) {
    if (typeof ga === 'function') {
      ga('send', 'event', {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventAction: eventAction,
        eventValue: eventValue
      });
    }
  }


}
