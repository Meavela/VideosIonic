import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  
  public videos: Video[];
  isConnected: boolean = false;

  constructor(private authService: AuthService, 
              private videosService: VideoService, 
              public navCtrl: NavController) 
  {

  }

  ngOnInit() {
    var currentUser = this.authService.currentUser();
    if(currentUser != null){
      this.isConnected = true;
    }

    this.videosService.getVideos();
    this.videosService.videos.subscribe(
      (videos: Video[]) => {
        this.videos = videos;
      }
    );
  }


  deconnect(){
    this.authService.signOutUser();
    location.reload();
  }

}
