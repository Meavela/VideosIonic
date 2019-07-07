import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Events } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.page.html',
  styleUrls: ['./video-detail.page.scss'],
})
export class VideoDetailPage implements OnInit {
  

  public videosCollection: AngularFirestoreCollection<Video>;
  public usersCollection: AngularFirestoreCollection<User>;
  public items: Observable<any[]>;
  public result: Array<any> = [];
  public comments: Array<any> = [];
  public userOfVideo: Array<any> = [];
  public sameUser: boolean = false;
  isConnected: boolean = false;

  constructor(private authService: AuthService, 
              private videosService: VideoService, 
              private router: Router, 
              public events: Events,
              private activatedRoute: ActivatedRoute, db: AngularFirestore) 
  { 
    this.videosCollection = db.collection<Video>('videos');
    this.usersCollection = db.collection<User>('users');
  }

  ngOnInit() {
    this.result = [];
    this.comments = [];

    var idVideo = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.videosService.getSingleVideo(idVideo);

    this.videosService.getCommentsOfVideo(idVideo).subscribe(item => {
      item.forEach(comment => {
        var date = new Date(comment["date"].seconds * 1000);

        comment["date"] = (date.getDate())+"/0"+(date.getMonth()+1)+"/"+(date.getFullYear());
        this.authService.getSingleUser(comment["idUser"]).subscribe(element => {
          element.forEach(item => {
            comment["userPseudo"] = item["pseudo"];
            
            this.comments.push(comment);
          });
        });
      });
    });
    
    this.videosService.videos.subscribe(item =>{
      item.forEach(video => {
        var date = new Date(video.date.seconds * 1000);

        video.date = (date.getDate())+"/0"+(date.getMonth()+1)+"/"+(date.getFullYear());

        this.result.pop();
        this.result.push(video);
        
        this.authService.getSingleUser(video.idUser).subscribe(item => {
          item.forEach(user => {
            this.userOfVideo.pop();
            this.userOfVideo.push(user);
          });
        });

        var currentUser = this.authService.currentUser();
        if(currentUser != null){
          this.isConnected = true;
          this.events.publish('isConnected:changed', this.isConnected);
          if(currentUser.uid == video.idUtilisateur){
            this.sameUser = true;
          }
        }
        
      });
    });
    
  }

  onDeleteVideo(video: Video){
    var videos = this.videosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        var data = a.payload.doc.data() as Video;
        var id = a.payload.doc.id;
        return { id, data };
      }))
    );
    
    videos.subscribe(item => {
      item.forEach(element =>{
        if(element.data.idVideo == video.idVideo){
          this.videosService.removeVideo(video, element.id);
        }
      });
    });

    this.router.navigate(['/videos']);
  }

  deconnect(){
    this.authService.signOutUser();
    location.reload();
  }
}

