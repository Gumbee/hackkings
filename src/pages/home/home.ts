import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CalendarPage } from '../calendar/calendar';
import { PulsePage } from '../pulse/pulse';

import {File} from 'ionic-native';
import {writeFile} from "fs";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  constructor(public navCtrl: NavController) {
    var cordova: any;
    const fs:string = cordova.file.dataDirectory;
    this.createDirectory("\\");
    //this.createDir("\\", "NEWFOLDER", false);
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

  createFile(dirEntry, fileName) {
  // Creates a new file or returns the file if it already exists.
  dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {

    writeFile(fileEntry, null);

  }, null);

}

  createDirectory(rootDirEntry) {
  rootDirEntry.getDirectory('NewDirInRoot', { create: true }, function (dirEntry) {
    dirEntry.getDirectory('images', { create: true }, function (subDirEntry) {

      this.createFile(subDirEntry, "fileInNewSubDir.txt");

    }, null);
  }, null);
}

}
