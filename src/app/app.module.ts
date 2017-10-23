import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SpeechRecognition } from "@ionic-native/speech-recognition";
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from "@ionic-native/file"

import {HttpModule} from "@angular/http";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MainClass} from "../services/MainClass";
import {LyricPage} from "../pages/lyrics/lyrics";
import {storagePage} from "../pages/localStorage/localStorage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LyricPage,
    storagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LyricPage,
    storagePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpeechRecognition,
    MainClass,
    File,

  ]
})
export class AppModule {}
