import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, Events } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.page.html',
  styleUrls: ['./video-detail.page.scss'],
})
export class VideoDetailPage implements OnInit {
  

  public videosCollection: AngularFirestoreCollection<Video>;
  public commentsCollection: AngularFirestoreCollection<Comment>;
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
              public navCtrl: NavController,
              public events: Events,
              private activatedRoute: ActivatedRoute, 
              db: AngularFirestore) 
  { 
    this.videosCollection = db.collection<Video>('videos');
    this.usersCollection = db.collection<User>('users');
    this.commentsCollection = db.collection<Comment>('comments');
  }

  ngOnInit() {
    this.result = [];
    
    var idVideo = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.videosService.getSingleVideo(idVideo);

    this.videosService.getCommentsOfVideo(idVideo).subscribe(item => {
      item.forEach(comment => {
        var date = new Date(comment["date"].seconds * 1000);

        comment["date"] = "le "+(date.getDate())+"/"+(date.getMonth()+1)+"/"+(date.getFullYear())+" à "+(date.getHours())+":"+(date.getMinutes())+":"+(date.getSeconds());
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
  commentToAdd: any = {};
  @ViewChild('avis', {read: ElementRef}) avisElement:ElementRef;

  onSaveComment(video: Video){
    // date
    this.commentToAdd.date = new Date();

    var currentUser = this.authService.currentUser();
    var idComment = 0;
    var passed = false;
    var countComment = 0;
    this.authService.getSingleUserByMail(currentUser.email).subscribe(item => {
      item.forEach(element => {
        // idUser
        this.commentToAdd.idUser = element["idUser"];
        // idVideo
        this.commentToAdd.idVideo = video["idVideo"];
        // idComment
        this.videosService.getComments().forEach(comments => {
          comments.forEach(comment => {
            if (comment["idComment"] > idComment) {
              idComment = comment["idComment"];
            }
            countComment++;
            if(comments.length == countComment && !passed){
              passed = true;
              this.commentToAdd.idComment = idComment+1;
              this.videosService.addComment(this.commentToAdd);

              this.avisElement.nativeElement.value = "";
              
              while(this.comments.length > 0) {
                this.comments.pop();
              }
            }
          });
        });
      });
    });
  }

  onDeleteComment(comment){
    var comments = this.commentsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        var data = a.payload.doc.data() as Comment;
        var id = a.payload.doc.id;
        return { id, data };
      }))
    );

    comments.subscribe(item => {
      item.forEach(element => {
        if(element.data.idComment == comment.idComment){
          this.videosService.removeComment(element.id);
          
          location.reload();
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

