

  import{ Component } from '@angular/core';
  import{ NavController, NavParams } from "ionic-angular"

  @Component({
    templateUrl: 'lyrics.html'
    })

  export class LyricPage {

    lyrics: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {

      this.lyrics = this.navParams.get('lyrics')
    }
  }
