import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.page.html',
  styleUrls: ['./video-detail.page.scss'],
})
export class VideoDetailPage implements OnInit {

  public db: AngularFirestore;
  public items: Observable<any[]>;
  public idVideo;
  public result: Array<any> = [];

  /**
   * Constructor of our details page
   * @param activatedRoute Information about the route we are on
   */
  constructor(private activatedRoute: ActivatedRoute, db: AngularFirestore) 
  { 
    this.db = db;
  }

  ngOnInit() {
    this.idVideo = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.items = this.db.collection('videos', ref => ref.where('idVideo', '==', this.idVideo)).valueChanges();
    this.items.subscribe(item =>{
      item.forEach(element => {
        this.result.push(element);
      });
    });
  }

}

