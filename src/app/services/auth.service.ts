import { Injectable } from '@angular/core';
// import { FirebaseAuth, FirebaseAuthState } from '@angular/fire';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUser(){
    return firebase.auth().currentUser;
  }

  currentUserId(){
    firebase.auth().onAuthStateChanged( user => {
      console.log(user);
    });
  }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  updateUser(displayName: string, photoURL: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(function (user) {
          user.updateProfile({
            displayName: displayName,
            photoURL: photoURL
          }).then(
            () => {
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
    );
    
    // return new Promise(
    //   (resolve, reject) => {
    //     firebase.auth().
    //     firebase.auth().updateCurrentUser(user).then(
    //       () => {
    //         resolve();
    //       },
    //       (error) => {
    //         reject(error);
    //       }
    //     );
    //   }
    // );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
