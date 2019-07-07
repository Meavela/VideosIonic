import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: Observable<any[]>;
  public usersCollection: AngularFirestoreCollection<User>;

  constructor(public db: AngularFirestore) 
  { 
    
  }

  getSingleUser(id: number){
    return this.db.collection('users', ref => ref.where('idUser', '==', id)).valueChanges();
  }

  getSingleUserByMail(email: string){
    return this.db.collection('users', ref => ref.where('mail', '==', email)).valueChanges();
  }

  currentUser(){
    return firebase.auth().currentUser;
  }

  currentUserId(){
    firebase.auth().onAuthStateChanged( user => {
      // console.log(user);
    });
  }
  toAdd:any = {}
  addUser(user: Object){
    var allUsers = this.db.collection('users').valueChanges();
    var idUser = 0;
    var countUser = 0;
    var passed = false;
    allUsers.forEach(users => {
      users.forEach(userElement => {
        if (userElement["idUser"] > idUser) {
          idUser = userElement["idUser"];
        }
        countUser++;
        if(countUser == users.length && !passed){
          passed = true;
          this.toAdd.mail = user["email"];
          this.toAdd.idUser = idUser+1;
          this.db.collection('users').add(this.toAdd);
        }
      });
    });
  }

  createNewUser(email: string, password: string, user: Object) {
    this.addUser(user);
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
  toUpdate:any = {}
  modifyUser(displayName: string, idUser: number, email: string){
    var resultDataId = this.db.collection<User>('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        var data = a.payload.doc.data() as User;
        var id = a.payload.doc.id;
        return { id, data };
      }))
    );
    
    var passed = false;
    resultDataId.subscribe(item => {
      item.forEach(element =>{
        if(element.data.idUser == idUser && !passed){
          passed = true;
          this.toUpdate.pseudo = displayName;
          this.toUpdate.mail = email;
          this.toUpdate.idUser = idUser;
          this.db.collection('users').doc(element.id).update(this.toUpdate).then(function() {
            console.log("Document successfully update!");
          }).catch(function(error) {
              console.error("Error updating document: ", error);
          });
        }
      });
    });
  }

  updateUser(displayName: string, photoURL: string, idUser: number, email:string){
    this.modifyUser(displayName, idUser, email);
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
