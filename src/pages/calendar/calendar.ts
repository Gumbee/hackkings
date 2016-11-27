import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

	month: any[][] = [[{n:1,a:0},{n:2,a:0},{n:3,a:0},{n:4,a:0},{n:5,a:0},{n:6,a:0},{n:7,a:0}],[{n:8,a:0},{n:9,a:0},{n:10,a:0},{n:11,a:0},{n:12,a:0},{n:13,a:0},{n:14,a:0}],[{n:15,a:0},{n:16,a:0},{n:17,a:0},{n:18,a:0},{n:19,a:0},{n:20,a:0},{n:21,a:0}],[{n:22,a:0},{n:23,a:0},{n:24,a:0},{n:25,a:0},{n:26,a:0},{n:27,a:0},{n:28,a:0}],[{n:29,a:0},{n:30,a:0},{n:31,a:0},0,0,0,0]];
	hasSelected = [];

	constructor(public navCtrl: NavController) {

	}

	selectDay(row: number,index: number){
		// delete all selections if a selected element is selected again
		if(this.month[row][index].a == true){
			for(let week of this.month){
				for(let day of week){
					if(day.a != undefined){
						day.a = false;
					}
				}
			}
			return;
		}

		this.month[row][index].a = true;

		this.hasSelected[this.hasSelected.length] = {row:row, index:index};
		
		// select all elements between the two selected elements that are farthest away
		if(this.hasSelected.length>1){
			let ia = this.hasSelected[0].row;
			let ja = this.hasSelected[0].index;

			let ib = row;
			let jb = index;

			let increment = 1;

			if(ia>ib || ia==ib && ja>jb){
				let tmp = ia;
				ia = ib;
				ib = tmp;
				tmp = ja;
				ja = jb;
				jb = tmp
			}

			while(ia<ib || ja<jb){
				this.month[ia][ja].a = true;
				ja++
				if(ja>6){
					ja=0;
					ia++;
				}
			}	
			this.hasSelected = []
			this.hasSelected[this.hasSelected.length] = {row:row, index:index};

		}


	}

}
