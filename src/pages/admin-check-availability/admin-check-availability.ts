import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, Platform, AlertController, ToastController, ModalController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirebaseService } from '../register/firebase.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AdminLogin } from '../admin-login/admin-login';
import { ModalPage } from '../modal/modal';

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
    selectedDate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public menuCtrl: MenuController, public loadingCtrl:LoadingController, private platform: Platform, public alertCtrl: AlertController, public toastCtrl: ToastController, public googleService: FirebaseService, public http: Http, public modalCtrl: ModalController) {
    this.date =  navParams.data.data;
    this.uid =  navParams.get('uid');
    var dateParts = this.date.split("-");
    this.selectedDate = dateParts[2]+'/'+dateParts[1]+'/'+dateParts[0].slice(-2);
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
    navToBack()
    {
        this.navCtrl.pop();
    }
     logout()
    {
        this.navCtrl.setRoot(AdminLogin);
    }
  bookCourt(courtid, id){
       let data = this.dataList[id];
        let prompt = this.alertCtrl.create({
        title: 'Booking Confirmation',
        subTitle: data.uid,
        message: data.email,
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
    availCourt(courtid, id){
       let data = this.dataList[id];
        let prompt = this.alertCtrl.create({
        title: 'Booking Confirmation',
        inputs:[
            {
                name:'mno',placeholder:'Mobile number'
            },
            {
                name:'email',placeholder:'email id'
            }
        ],
        buttons: [
            {
            text: 'Cancel',
            handler: data => {
                this.googleService.updateCourtDetails(this.date,courtid,'Rejected').then(data => {
                    let dataListResponse = data;
                    let toast = this.toastCtrl.create({
                    message: 'Cancelled',
                    duration: 3000
                    });
                    toast.present();
                    this.ionViewDidLoad();
                });
            }
            },
            {
            text: 'Yes',
            handler: data => {
                this.googleService.postCourtDetails(this.date,courtid,data.mno,data.email).then(data => {
                    let dataListResponse = data;
                    this.googleService.updateCourtDetails(this.date,courtid,'Approved').then(data => {
                        let dataListResponse = data;
                        let toast = this.toastCtrl.create({
                        message: 'Accepted',
                        duration: 3000
                        });
                        toast.present();
                        this.ionViewDidLoad();
                    });
                    this.ionViewDidLoad();
                });
                
            }
            }
        ]
        });
        prompt.present();
    }
    openCalendar(){
        let modal = this.modalCtrl.create(ModalPage);
        modal.present();
        modal.onDidDismiss(data=>{
            this.date = data;
            this.ionViewDidLoad();
             //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
    })
}
    booked(id){
        let data = this.dataList[id];
        let alert = this.alertCtrl.create({
            title: 'Already Booked by',
            subTitle: data.uid,
            message: data.email,
            buttons: ['Dismiss']
        });
        alert.present();
    }
}
