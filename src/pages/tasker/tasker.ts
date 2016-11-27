import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { BubbleButtonComponent } from '../../components/bubble-button/bubble-button';

/*
  Generated class for the Tasker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tasker',
  templateUrl: 'tasker.html'
})
export class TaskerPage {

	@ViewChild('input') input: any;

	eventAnimation: any = {
		circleIn: false,
		display: false,
		fadeIn: false,
		loaderShow: false,
		textFade: false,
		textMsg: 'Event created.',
		textShow: false
	};

	taskForm : any = {subjects:[]};
	subject : any = {};

	constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
		
	}

	submitForm(){
		this.animateSubmit();
		setTimeout(()=>{
			this.animateText("Schedule is beeing computed...");
			
			let that = this;

			var worker = new Worker('assets/service-worker.js');
			worker.postMessage(this.eventAnimation);

			worker.onmessage = function(event) {
				console.log("Worker data arrived.")
				setTimeout(()=>{
					that.navCtrl.pop();
				}, 4000);
			};

		}, 2000);
	}

	addSubject() {
		if(this.subject.name !== undefined && this.subject.name.trim() != ''){
			this.taskForm.subjects.push({name: this.subject.name, duration: "00:00"});
			this.subject = {name:''};
			this.input.setFocus();
		}
	}

	getDuration(id: number) {
		let alert = this.alertCtrl.create({
			title: 'Duration',
			inputs: [
				{
				name: 'duration',
				placeholder: '10:05',
				type: 'text'
				}
			],
				buttons: [
				{
				text: 'Cancel',
				role: 'cancel',
				handler: data => {
				console.log('Cancel clicked');
				}
			},
				{
				text: 'Update',
				handler: data => {
					let res = data.duration.split(":");
					let hours = parseInt(res[0]);
					let minutes = parseInt(res[1]);

					let output = "";

					if(hours){
						output += ('0'+hours).slice(-2) + ":";
					}else{
						output += "00:";
					}
					if(minutes){
						output += ('0'+minutes).slice(-2);
					}else{
						output += "00";
					}

					this.taskForm.subjects[id].duration = output;
				}
			}
			]
		});
		alert.present();
	}

	animateSubmit(){
		this.eventAnimation.display = true;
		setTimeout(()=>{
			this.eventAnimation.circleIn = true;
			setTimeout(()=>{
				this.eventAnimation.fadeIn = true;
				this.eventAnimation.loaderShow = true;
			}, 200);
		}, 16*4);
	}

	animateText(message: string){
		this.eventAnimation.textMsg = message;
		this.eventAnimation.textShow = true;
		this.eventAnimation.loaderShow = false;
		setTimeout(()=>{
			this.eventAnimation.textFade = true;
		},100);
	}

}
