import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Dashboard } from '../pages/dashboard/dashboard';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { AngularFireModule } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
    rootPage = Login;
  // make HelloIonicPage the root (or first) page

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
    // set our app's pages
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }
  navToBack()
  {
    this.nav.pop();
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    // navigate to the new page if it is not the current page
  }

  
}
// firebase.auth().onAuthStateChanged((user)=>{
//   if(user){
//     this.rootPage = Dashboard;
//   }
//   else{
//       this.rootPage = Login;
//   }
// })
