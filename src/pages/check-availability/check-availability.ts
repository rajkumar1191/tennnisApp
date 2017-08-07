import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, Platform, AlertController, ToastController, ModalController   } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirebaseService } from '../register/firebase.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Login } from '../login/login';
// import { Calendar } from '@ionic-native/calendar';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
declare var navigator: any;
declare var Connection: any;
import { ModalPage } from '../modal/modal';

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
    selectedDate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public menuCtrl: MenuController, public loadingCtrl:LoadingController, private platform: Platform, public alertCtrl: AlertController, public toastCtrl: ToastController, public googleService: FirebaseService, public http: Http, public modalCtrl: ModalController) {
    this.date =  navParams.data.data;

    var dateParts = this.date.split("-");
    this.selectedDate = dateParts[2]+'/'+dateParts[1]+'/'+dateParts[0].slice(-2);

    this.uid =  navParams.get('uid');
  }
openCalendar(){
        let modal = this.modalCtrl.create(ModalPage);
        modal.present();
        modal.onDidDismiss(data=>{
            this.date = data;
            this.ionViewDidLoad();
             //This is a listener which wil get the data passed from modal when the modal's view controller is dismissed
        console.log("Data =>", data) //This will log the form entered by user in add modal.
    })
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
        this.navCtrl.setRoot(Login);
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
                this.googleService.postCourtDetails(this.date,courtid,this.uid[0].mno,this.uid[0].email).then(data => {
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
