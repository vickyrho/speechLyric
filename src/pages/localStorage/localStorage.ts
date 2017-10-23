

import{ Component } from '@angular/core';
import{ NavController, NavParams } from "ionic-angular"
import{ File } from "@ionic-native/file"

@Component({
  templateUrl: 'localStorage.html'
})

export class storagePage {

  Downloads: any ;

  constructor(public file : File){

  }


  ionViewDidLoad(){

    this.file.listDir(this.file.externalRootDirectory,'Download').then((data) => {
      this.Downloads = data ;
    });
  }


}
