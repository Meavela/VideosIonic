import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Video } from '../models/video.model';
import { NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  videos: Observable<any[]>;

  constructor(public db: AngularFirestore) 
  { 
    this.getVideos();
  }

  getVideos(){
    this.videos = this.db.collection('videos').valueChanges();
  }

  getSingleVideo(id: number){
    this.videos = this.db.collection('videos', ref => ref.where('idVideo', '==', id)).valueChanges();

  }

  createNewVideo(video: Object){
    this.db.collection('videos').add(video);
    this.getVideos();
  }

  removeVideo(video: Video, idToRemove: string){
    if(video.image){
      const storageRef = firebase.storage().refFromURL(video.image);
      storageRef.delete().then(
        () => {
          console.log('Image supprimée !');
        },
        (error) => {
          console.log("La photo n'a pas pu être supprimé : "+error);
        }
      )
    }
    console.log(video);
    this.db.collection('videos').doc(idToRemove).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const uniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref().child('images/'+uniqueFileName).put(file).then(function(snapshot){
          snapshot.ref.getDownloadURL().then(function(downloadUrl){
            resolve(downloadUrl);
          })
        });
      }
    );
  }

}
