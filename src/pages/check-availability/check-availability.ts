import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, Platform, AlertController, ToastController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirebaseService } from '../register/firebase.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
declare var navigator: any;
declare var Connection: any;

@Component({
  selector: 'page-check-availability',
  templateUrl: 'check-availability.html'
})
export class CheckAvailability {
    // datalist: FirebaseListObservable<any>;
    dataList:any;
    date:any;
    uid:any;
    email:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public menuCtrl: MenuController, public loadingCtrl:LoadingController, private platform: Platform, public alertCtrl: AlertController, public toastCtrl: ToastController, public googleService: FirebaseService, public http: Http) {
    this.date =  navParams.data.data;
    this.uid =  navParams.get('uid');
  }
  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
    });
    loader.present();
    this.googleService.getCourtDetails(this.date).then(data => {
        let dataListResponse = data;
        this.dataList = dataListResponse;
        loader.dismiss();
        console.log(this.dataList);
    });
  }
  bookCourt(courtid){
        let prompt = this.alertCtrl.create({
        title: 'Booking Confirmation',
        message: "Are you sure do you want to book this court",
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
            text: 'Yes',
            handler: data => {
                this.googleService.postCourtDetails(this.date,courtid,this.uid,this.email).then(data => {
                    let dataListResponse = data;
                    let toast = this.toastCtrl.create({
                    message: 'Request send successfully',
                    duration: 3000
                    });
                    toast.present();
                    this.ionViewDidLoad();
                });
            }
            }
        ]
        });
        prompt.present();
    }
    booked(){
        let alert = this.alertCtrl.create({
            title: 'Booking Availablity',
            subTitle: 'Already Booked.',
            buttons: ['Dismiss']
        });
        alert.present();
    }
}
