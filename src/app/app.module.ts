import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
// import { CalendarModule } from 'angular-calendar';
import { NgCalendarModule  } from 'ionic2-calendar';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Login } from '../pages/login/login';
import { AdminLogin } from '../pages/admin-login/admin-login';
import {  HttpModule } from '@angular/http';
import { IonicNativePlugin } from '@ionic-native/core';
import { AdminDashboard } from '../pages/admin-dashboard/admin-dashboard';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Register } from '../pages/register/register';
import { AdminCheckAvailability } from '../pages/admin-check-availability/admin-check-availability';
import { CheckAvailability } from '../pages/check-availability/check-availability';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseService } from '../pages/register/firebase.service';
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
    Dashboard,
    AdminDashboard,
    Register,
    AdminLogin,
    CheckAvailability,
    AdminCheckAvailability
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
    Dashboard,
    AdminDashboard,
    Register,
    AdminLogin,
    CheckAvailability,
    AdminCheckAvailability
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicNativePlugin,
    FirebaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
