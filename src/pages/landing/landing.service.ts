import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class LandingService{

    private data:any;
    public fireAuth:any;
    public userProfile:any;
    constructor(private http: Http) {
        this.fireAuth = firebase.auth();
        this.userProfile = firebase.database().ref('users');
    }

    signUpUser(email: string, password: string, mno: number, uname: string){
        return this.fireAuth.createUserWithEmailAndPassword(email,password).then((newUserCreated)=>{
            this.fireAuth.signInWithEmailAndPassword(email,password).then((authenticatedUser)=>{
                this.userProfile.child(authenticatedUser.uid).set({
                    email:email,
                    mno: mno,
                    uname: uname
                });
            });
        });
    }

    loginUser(email: string, password: string){
         return this.fireAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
           
        } else {
            alert(errorMessage);
        }
         if(errorCode){
            let authData = "error";
        }
        else
            {
                let authData = "Success"
            }
        console.log(error);
        });
    }
    logoutUser(email: string, password: string, mno: number, uname: string){
        return this.fireAuth.signOut();
    }
}
