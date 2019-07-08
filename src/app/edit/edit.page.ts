import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Video } from 'src/app/models/video.model';
import { Observable } from 'rxjs';
import { VideoService } from 'src/app/services/video.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  public videos: AngularFirestoreCollection<Video>;
  public items: Observable<any[]>;
  public result: Array<any> = [];
  videoForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,  
              public events: Events,
              private videosService: VideoService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute, 
              private db: AngularFirestore) 
  { 
    this.videos = db.collection<Video>('videos');
  }

  ngOnInit() {
    this.events.publish('isConnected:changed', true);
    this.initForm();
    var idVideo = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.videosService.getSingleVideo(idVideo);

    this.videosService.videos.subscribe(item =>{
      item.forEach(video => {
        this.result.push(video);
      });
    });
  }

  initForm(){
    this.videoForm = this.formBuilder.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  toAdd:any = {}
  onSaveVideo()
  {
    if(this.fileUrl && this.fileUrl !== '') {
      this.result[0].image = this.fileUrl;
    }

    if(this.toAdd.titre != null) {
      this.result[0].titre = this.toAdd.titre;
    }

    if(this.toAdd.type != null) {
      this.result[0].type = this.toAdd.type;
    }

    if(this.toAdd.genre != null) {
      this.result[0].genre = this.toAdd.genre;
      var genres = "";
      var count = 0;
      this.result[0].genre.forEach(element => {
        genres += element;
        count++;
        
        if(this.toAdd["genre"].length != count){
          genres += ",";
        }else {
          this.result[0].genre = genres;
        }
      });
    }

    if(this.toAdd.description != null) {
      this.result[0].description = this.toAdd.description;
    }

    var resultDataId = this.videos.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        var data = a.payload.doc.data() as Video;
        var id = a.payload.doc.id;
        return { id, data };
      }))
    );
    
    resultDataId.subscribe(item => {
      item.forEach(element =>{
        if(element.data.idVideo == this.result[0].idVideo){
          this.videosService.updateVideo(this.result[0], element.id);
        }
      });
    });

    this.router.navigate(['/videos', this.result[0].idVideo]);
  }

  deconnect(){
    this.authService.signOutUser();
    this.router.navigate(['/home']);
  }
}
