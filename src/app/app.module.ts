import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
// import { CalendarModule } from 'angular-calendar';
import { NgCalendarModule  } from 'ionic2-calendar';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Login } from '../pages/login/login';
import {  HttpModule } from '@angular/http';
import { IonicNativePlugin } from '@ionic-native/core';
import { MatchFixtures } from '../pages/match-fixtures/match-fixtures';
import { Landing } from '../pages/landing/landing';
import { MatchResult } from '../pages/match-result/match-result';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LandingService } from '../pages/landing/landing.service';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';
export const firebaseConfig = {
    apiKey: "AIzaSyCcsDm_lxX0RxJkF2LiD5NmtVum46cM9C8",
    authDomain: "tennisbooking-e419d.firebaseapp.com",
    databaseURL: "https://tennisbooking-e419d.firebaseio.com",
    projectId: "tennisbooking-e419d",
    storageBucket: "",
    messagingSenderId: "901803905283"
};
firebase.initializeApp(firebaseConfig);

import 'intl';
import 'intl/locale-data/jsonp/en';
@NgModule({
  declarations: [
    MyApp,
    Login,
    MatchFixtures,
    Landing,
    MatchResult
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    IonicStorageModule.forRoot(),
    // CalendarModule.forRoot(),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    MatchFixtures,
    Landing,
    MatchResult
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicNativePlugin,
    LandingService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
