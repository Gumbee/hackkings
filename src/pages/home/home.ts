import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CalendarPage } from '../calendar/calendar';
import { PulsePage } from '../pulse/pulse';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	task = "tasks"

	constructor(public navCtrl: NavController) {
	}

	openPage(page: string) {
		setTimeout(()=>{
			switch (page) {
				case "calendar":
					this.navCtrl.push(CalendarPage,{},{animate:true, direction: 'forward'});
					break;
				case "pulse":
					this.navCtrl.push(PulsePage);
					break;
				default:
					break;
			}	
		}, 150);
	}



}
