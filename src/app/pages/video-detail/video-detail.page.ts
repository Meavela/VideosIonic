import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.page.html',
  styleUrls: ['./video-detail.page.scss'],
})
export class VideoDetailPage implements OnInit {

  public tests: AngularFirestoreCollection<Video>;
  public items: Observable<any[]>;
  public result: Array<any> = [];

  /**
   * Constructor of our details page
   * @param activatedRoute Information about the route we are on
   */
  constructor(private videosService: VideoService, private router: Router, private activatedRoute: ActivatedRoute, db: AngularFirestore) 
  { 
    this.tests = db.collection<Video>('videos');
  }

  ngOnInit() {
    var idVideo = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.videosService.getSingleVideo(idVideo);
    this.videosService.videos.subscribe(item =>{
      item.forEach(element => {
        this.result.push(element);
      });
    });
  }

  onDeleteVideo(video: Video){
    var lol = this.tests.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Video;
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
    
    lol.subscribe(item => {
      item.forEach(element =>{
        if(element.data.idVideo == video.idVideo){
          this.videosService.removeVideo(video, element.id);
        }
      });
    });

    this.router.navigate(['/videos']);
  }

}

