import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Observable<any[]>;
  singleUser: User;

  constructor(public db: AngularFirestore) 
  { 
    this.getUsers();
  }

  getUsers(){
    this.users = this.db.collection('users').valueChanges();
  }

  getSingleUser(id: number){
    this.users = this.db.collection('users', ref => ref.where('idUser', '==', id)).valueChanges();
  }

}
