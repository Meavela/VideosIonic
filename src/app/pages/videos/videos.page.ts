import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  
  public videos: Video[];

  constructor(private splashScreen: SplashScreen, private videosService: VideoService, private router: Router, public navCtrl: NavController) 
  {

  }

  ngOnInit() {
    this.splashScreen.show();

    this.videosService.getVideos();
    this.videosService.videos.subscribe(
      (videos: Video[]) => {
        this.videos = videos;
      }
    );
  }


  // ngOnDestroy(){
  //   this.videos.unsubscribe();
  // }

}
