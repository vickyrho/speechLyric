import { Component } from '@angular/core';
import { NavController,AlertController, ToastController } from 'ionic-angular';
import { SpeechRecognition } from "@ionic-native/speech-recognition";
import { ChangeDetectorRef } from "@angular/core"
import { File } from '@ionic-native/file';

import { MediaPlugin } from 'ionic-native';
import {MainClass} from "../../services/MainClass";
import {LyricPage} from "../lyrics/lyrics"
import {storagePage} from "../localStorage/localStorage"


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  matches : any;
  downloads : any ;
  isRecording : any ;
  resultData : any ;
  sampleString : any ;
  newString : any ;
  lyricPrint : any ;
  lyricTitle : any ;

  constructor(public file : File, public toast : ToastController,public MainService : MainClass , public navCtrl: NavController,private alertCtrl : AlertController, private speechRecogniton : SpeechRecognition,private cd : ChangeDetectorRef) {
  }


  startListening(){

    try {
      this.speechRecogniton.startListening().subscribe(matches => {
        this.matches = matches;
        this.cd.detectChanges();
      });
    }
    catch(e)
    {
      this.showAlert(e);
    }
  }


  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showLyricsLink(){
    let re = /\ /gi;
    this.sampleString = this.matches[0] ;
//    this.sampleString = "shape of you";
    let result = this.sampleString.replace(re ,"+");

    this.MainService.getSearchResults(result).subscribe(data => {


        this.resultData = data.items;

        this.toast.create({
          message: 'ok',
          duration: 3000,
          position : 'bottom'
        }).present();
      },err => {
        console.log(err);
        this.toast.create({
          message: err.message,
          duration: 3000,
          position : 'bottom'
        }).present();
      }
    )
  }

  displayLink(index){


    let data = { data : {
      link : this.resultData[index].link,
      domain : this.resultData[index].displayLink

    }};

    this.MainService.fetchLyrics(data).subscribe(
      data => {
        console.log(data);
        this.lyricPrint = data.data ;
        let send_data ={
          data: this.lyricPrint,
          title: this.resultData[index].title
        };
        this.navCtrl.push(LyricPage,{lyrics: send_data});
      },err => {
        console.log(err);

      }

    )

  }


  showDirectory(){
    this.navCtrl.push(storagePage);
  }

  getPermissions() {
    this.speechRecogniton.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecogniton.requestPermission();
        }
      });
  }
}
