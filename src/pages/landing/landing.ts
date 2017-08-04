import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Login } from '../login/login';
import { LandingService } from './landing.service';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MatchFixtures } from '../match-fixtures/match-fixtures';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
  providers:[LandingService]
})
export class Landing {

  error: any;
  email:any;
  password:any;
  mno:any;
  uname:any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public splashScreen: SplashScreen, public googleService: LandingService, public alertCtrl: AlertController) {

  }

  SignUpUser(){
    this.googleService.signUpUser(this.email,this.password,this.mno,this.uname).then((authData)=>{
      this.navCtrl.setRoot(MatchFixtures);
    },error=>{
      loader.dismiss();            
      let alert = this.alertCtrl.create({
        title: 'Registration Error!!!',
        subTitle: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
    
    let loader = this.loadingCtrl.create({
      dismissOnPageChange:true,
    });
    loader.present();
  }
  ionViewDidLoad() {
    this.splashScreen.hide();
  }

  getLandingPage() {
    this.navCtrl.setRoot(Login);
  }
}
