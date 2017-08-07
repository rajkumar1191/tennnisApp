import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
import { AdminDashboard } from '../admin-dashboard/admin-dashboard';
import { Register } from '../register/register';
import { Login } from '../login/login';
import { FirebaseService } from '../register/firebase.service';

@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html',
  providers:[FirebaseService]
})
export class AdminLogin {
  email:any;
  password:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public googleService: FirebaseService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.menuCtrl.enable(true);
  }
  ionViewDidLoad() {
  }
  navToRegister() {
    this.navCtrl.setRoot(Register);
  }
  navtouser(){
    this.navCtrl.setRoot(Login);    
  }
  
  loginFunction() {
     let loader = this.loadingCtrl.create({
        // dismissOnPageChange:true,
      });
      loader.present();
   if(this.email == 'admin' && this.password == 'admin@12'){
      loader.dismiss();
     
           this.navCtrl.setRoot(AdminDashboard);
    }
    else{
      loader.dismiss();      
      let alert = this.alertCtrl.create({
          title: 'Login Error!!!',
          subTitle: 'Please enter username and password',
          buttons: ['OK']
        });
        alert.present();
    }
   }
}