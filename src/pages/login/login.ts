import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
import { AdminDashboard } from '../admin-dashboard/admin-dashboard';
import { AdminLogin } from '../admin-login/admin-login';
import { Register } from '../register/register';
import { FirebaseService } from '../register/firebase.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[FirebaseService]
})
export class Login {
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
  navtoadmin(){
    this.navCtrl.setRoot(AdminLogin);    
  }
  loginFunction() {
     let loader = this.loadingCtrl.create({
        // dismissOnPageChange:true,
      });
      loader.present();
    if(this.email != undefined && this.email != 'admin' && this.password != undefined && this.password != 'admin@12'){
        this.googleService.userLogin(this.email,this.password).then((authData)=>{
          if(authData != ''){
            loader.dismiss();                
            this.navCtrl.setRoot(Dashboard,{udetails:authData});
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
            // this.navCtrl.setRoot(Dashboard);             
    }
    else if(this.email == 'admin' && this.password == 'admin@12'){
           this.navCtrl.setRoot(AdminDashboard);
    }
    else{
            loader.dismiss();      
      
      let alert = this.alertCtrl.create({
          title: 'Login Error!!!',
          subTitle: 'Please enter email and password',
          buttons: ['OK']
        });
        alert.present();
        
    }
   }
}