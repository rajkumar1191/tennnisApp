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
  selector: 'page-admin-check-availability',
  templateUrl: 'admin-check-availability.html'
})
export class AdminCheckAvailability {
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
        buttons: [
            {
            text: 'Reject',
            handler: data => {
                this.googleService.updateCourtDetails(this.date,courtid,'Rejected').then(data => {
                    let dataListResponse = data;
                    let toast = this.toastCtrl.create({
                    message: 'Rejected',
                    duration: 3000
                    });
                    toast.present();
                    this.ionViewDidLoad();
                });
            }
            },
            {
            text: 'Accept',
            handler: data => {
                this.googleService.updateCourtDetails(this.date,courtid,'Approved').then(data => {
                    let dataListResponse = data;
                    let toast = this.toastCtrl.create({
                    message: 'Accepted',
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
