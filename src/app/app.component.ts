import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from './services/analytics.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AnalyticsService]
})
export class AppComponent implements OnInit {

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    //this.appendTrackingCode();
    //this.analyticsService.emitEvent("testCategory", "testAction", "testLabel", 10);
  }

  private async appendTrackingCode() {
    try {
      const script = document.createElement('script');
      script.innerHTML = `
	        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	        ga('create', '` + environment.GA_KEY + `', 'auto');
		  `;
      document.head.appendChild(script);
    } catch (ex) {
      console.error('Error appending analytics');
      console.error(ex);
    }
  }

}