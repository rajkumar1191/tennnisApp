import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { MatchFixtures } from '../match-fixtures/match-fixtures';
import { Landing } from '../landing/landing';
import { LandingService } from '../landing/landing.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[LandingService]
})
export class Login {
  email:any;
  password:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public googleService: LandingService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.menuCtrl.enable(true);
  }
  ionViewDidLoad() {
  }
  navToRegister() {
    this.navCtrl.setRoot(Landing);
  }
  loginFunction() {
    if(this.email != undefined && this.password != undefined){
        this.googleService.loginUser(this.email,this.password).then((authData)=>{
          if(authData != undefined){
            this.navCtrl.setRoot(MatchFixtures);             
          }
          else
            {
              loader.dismiss();      
              let alert = this.alertCtrl.create({
                title: 'Login Error!!!',
                subTitle: "Please check user name and password",
                buttons: ['OK']
              });
              alert.present();                    
            }
      });
      
      let loader = this.loadingCtrl.create({
        dismissOnPageChange:true,
      });
      loader.present();
    }
    else{
      let alert = this.alertCtrl.create({
          title: 'Login Error!!!',
          subTitle: 'Please enter email and password',
          buttons: ['OK']
        });
        alert.present();
    }
   
  }
}
