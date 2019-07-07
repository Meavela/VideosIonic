import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { Video } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video.service';
import { AuthService } from 'src/app/services/auth.service';
import { AnimationService, AnimationBuilder } from 'css-animator';

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
              public navCtrl: NavController,
              public animationService: AnimationService,
              public events: Events) 
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
        this.allData = videos;
        this.filterData = this.allData;
      }
    );
  }

  allData = []; //Store all data from provider
  filterData = [];//Store filtered data
  searchTerm: string = '';

  ionViewDidEnter(){

    var currentUser = this.authService.currentUser();
    if(currentUser != null){
      this.isConnected = true;
    }
    this.events.publish('isConnected:changed', this.isConnected);

  }

  setFilteredLocations(){
    if(this.searchTerm == ''){
      this.filterData = this.allData;
    }
    else{
      this.filterData = this.allData.filter((item) => {
        return item.titre.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
  
    }
  }

  deconnect(){
    this.authService.signOutUser();
    location.reload();
  }

}
