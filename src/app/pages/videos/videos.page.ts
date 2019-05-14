import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  
  public items: Observable<any[]>;
  public db: AngularFirestore;

  constructor(public navCtrl: NavController,db: AngularFirestore) 
  { 
    this.db = db;
  }

  ngOnInit() {
    this.items = this.db.collection('videos').valueChanges();
  }

  redirectToDetails(item){
   console.log(item);
   this.navCtrl.navigateForward("/videos/"+item.idVideo);
  }

}
