import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  
  public videos: Video[];

  constructor(private videosService: VideoService, private router: Router, public navCtrl: NavController) 
  { 
    
  }

  ngOnInit() {
    this.videosService.videos.subscribe(
      (videos: Video[]) => {
        this.videos = videos;
        console.log(videos);
      }
    );
  }

  onNewVideo(){
    this.router.navigate(['/videos', 'new']);
  }


  onViewVideo(id: number){
    this.router.navigate(['/videos', id]);
  }

  // ngOnDestroy(){
  //   this.videos.unsubscribe();
  // }

}
