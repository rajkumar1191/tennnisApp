import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

    private data: any;
    public fireAuth: any;
    public userProfile: any;
    public courtDetails: any;
    public userDetail: any;
    public userLogi: any;
    public courtDetails4: any;
    public courtDetails5: any;
    public courtDetails6: any;
    public courtDetails7: any;
    public courtDetails8: any;

    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache, no-store' });

    constructor(private http: Http) {
        this.fireAuth = firebase.auth();
        this.userProfile = firebase.database().ref('users');
        // this.courtDetails = firebase.database().ref('TennisBookingApp');
    }

    userReg(email, password, uname, mno) {
        return new Promise(resolve => {
            this.http.get('http://poriyaalan.com/student/tennis/userReg.php?email='+email+'&password='+password+'&uname='+uname+'&mno='+mno).map(res => res.json()).subscribe(data => {
                this.http.get('http://poriyaalan.com/student/tennis/userReg.php?email='+email+'&password='+password).map(res => res.json()).subscribe(data => {
                    this.userDetail = data.details;
                });
                resolve(this.userDetail);
            });
        });
    }
    userLogin(email, password) {
        return new Promise(resolve => {
            this.http.get('http://poriyaalan.com/student/tennis/userLogin.php?email='+email+'&password='+password).map(res => res.json()).subscribe(data => {
                this.userLogi = data.details;
            });
            resolve(this.userLogi);
        });
    }

    getCourtDetails(date) {
        return new Promise(resolve => {
            this.http.get('http://poriyaalan.com/student/tennis/newInsert.php?date=' + date).map(res => res.json()).subscribe(data => {
                this.courtDetails = data.details;
                resolve(this.courtDetails);
                console.log(this.courtDetails);
            });
        });
    }
    postCourtDetails(date, id, uid, email) {
        return new Promise(resolve => {
            this.http.get('http://poriyaalan.com/student/tennis/post.php?bookedDate=' + date + '&courtid=' + id+'&uid='+uid+'&email='+email).map(res => res.json()).subscribe(data => {
                this.courtDetails = data;
                resolve(this.courtDetails);
                console.log(this.courtDetails);
            });
        });

    }
    updateCourtDetails(date, id, status) {
        return new Promise(resolve => {
            this.http.get('http://poriyaalan.com/student/tennis/update.php?bookedDate=' + date + '&courtid=' + id+'&status='+status).map(res => res.json()).subscribe(data => {
                this.courtDetails = data;
                resolve(this.courtDetails);
                console.log(this.courtDetails);
            });
        });

    }
    signUpUser(email: string, password: string, mno: number, uname: string) {
        return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUserCreated) => {
            this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
                this.userProfile.child(authenticatedUser.uid).set({
                    email: email,
                    mno: mno,
                    uname: uname
                });
            });
        });
    }

    loginUser(email: string, password: string) {
        return this.fireAuth.signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {

            } else {
                alert(errorMessage);
            }
            if (errorCode) {
                let authData = "error";
            }
            else {
                let authData = "Success"
            }
            console.log(error);
        });
    }

    logoutUser(email: string, password: string, mno: number, uname: string) {
        return this.fireAuth.signOut();
    }
}