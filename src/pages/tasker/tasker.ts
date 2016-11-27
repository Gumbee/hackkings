import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TaskerPage Page');
  }

}
