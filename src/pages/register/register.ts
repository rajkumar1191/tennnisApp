import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Login } from '../login/login';
import { FirebaseService } from './firebase.service';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers:[FirebaseService]
})
export class Register {

  error: any;
  email:any;
  password:any;
  mno:any;
  uname:any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public splashScreen: SplashScreen, public googleService: FirebaseService, public alertCtrl: AlertController) {

  }

  SignUpUser(){
    this.googleService.signUpUser(this.email,this.password,this.mno,this.uname).then((authData)=>{
      this.navCtrl.setRoot(Dashboard);
    },error=>{
      loader.dismiss();            
      let alert = this.alertCtrl.create({
        title: 'Registration Error!!!',
        subTitle: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
    // this.googleService.userReg(this.email,this.password,this.mno,this.uname).then((authData)=>{
    //   this.navCtrl.setRoot(Dashboard);
    // },error=>{
    //   loader.dismiss();            
    //   let alert = this.alertCtrl.create({
    //     title: 'Registration Error!!!',
    //     subTitle: error.message,
    //     buttons: ['OK']
    //   });
    //   alert.present();
    // });
    
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
