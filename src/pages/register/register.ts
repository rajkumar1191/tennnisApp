import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Login } from '../login/login';
import { FirebaseService } from './firebase.service';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Dashboard } from '../dashboard/dashboard';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
// import { GooglePlus } from '@ionic-native/google-plus';
// import { GoogleAuth, User } from '@ionic/cloud-angular';
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
  // constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public splashScreen: SplashScreen, public googleService: FirebaseService, public alertCtrl: AlertController, private fb: Facebook, public googlePlus: GooglePlus) {

  }
  facebookLogin(){
    // this.fb.browserInit(2056568957906976);
    // this.fb.login(["email"]).then((res: FacebookLoginResponse) => { 
    //     if (res.authResponse) {
    //         this.fb.api('/me?fields=email,name', null).then((response) => { 
    //               console.log(response);
    //                 this.email = response.email;
    //                 this.uname = response.name;
    //             });

    //     }
    // });
  }
  googleLogin(){
    //   this.googleAuth.login().then((data)=>{
    //     console.log(JSON.stringify(data));
    // });
    // this.googlePlus.login({'scopes': '','webClientId': '1086196977662-uv0i0bom9s55l4g8qvcr8rd7kgkp2l7j.apps.googleusercontent.com','offline': true}).
    // then(
    //   data => console.log(data)
    // ).catch(
    //   // err => console.log(err)
    // );
  }
  SignUpUser(){
    // this.googleService.signUpUser(this.email,this.password,this.mno,this.uname).then((authData)=>{
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
    this.googleService.userReg(this.email,this.password,this.mno,this.uname).then((authData)=>{
      if(authData != ''){
        loader.dismiss();                
        this.navCtrl.setRoot(Dashboard,{udetails:authData});
      }
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
      // dismissOnPageChange:true,
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
