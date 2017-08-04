import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, Platform, AlertController, ToastController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';


declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'page-match-result',
  templateUrl: 'match-result.html',
})
export class MatchResult {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public menuCtrl: MenuController, public loadingCtrl:LoadingController, private platform: Platform, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    
  }
  
  ionViewDidLoad() {
   
  }
  booked(){
    let alert = this.alertCtrl.create({
        title: 'Booking Availablity',
        subTitle: 'Already Booked.',
        buttons: ['Dismiss']
    });
    alert.present();
  }
  avail(){
    let prompt = this.alertCtrl.create({
    title: 'Booking Confirmation',
    message: "Are you sure do you want to book this court",
    inputs: [
        {
        name: 'Name',
        placeholder: 'Name'
        },
    ],
    buttons: [
        {
        text: 'Cancel',
        handler: data => {
            let toast = this.toastCtrl.create({
            message: 'Request Cancelled',
            duration: 3000
            });
            toast.present();
        }
        },
        {
        text: 'Save',
        handler: data => {
            let toast = this.toastCtrl.create({
            message: 'Request send successfully',
            duration: 3000
            });
            toast.present();
        }
        }
    ]
    });
    prompt.present();
}
}
