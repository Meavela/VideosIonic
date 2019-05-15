import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  videoForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  isConnected: boolean = false;

  constructor(private authService: AuthService, 
              private formBuilder: FormBuilder, 
              private router: Router, 
              private videoService: VideoService) 
  { 

  }
  

  ngOnInit() {
    var currentUser = this.authService.currentUser();
    if(currentUser != null){
      this.isConnected = true;
    }
    this.initForm();
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
  onSaveVideo(){
    if(this.fileUrl && this.fileUrl !== '') {
      this.toAdd.image = this.fileUrl;
    }
    this.toAdd.date = new Date();

    var currentUser = this.authService.currentUser();
    
    this.toAdd.idUtilisateur = currentUser.uid;
    
    this.videoService.getVideos();
    var allVideos = this.videoService.videos;
    var idVideo = 0;
    allVideos.forEach(videos => {
      videos.forEach(video => {
        if (video.id > idVideo) {
          idVideo = video.id;
        }
      });
    });
    idVideo++;
    this.toAdd.idVideo = idVideo;
    this.videoService.createNewVideo(this.toAdd);
    this.router.navigate(['/videos']);
  }

  onUploadFile(file: File) {
    this.fileUploaded = false;
    this.fileIsUploading = true;

    var imageUpload = this.videoService.uploadFile(file);
    
    imageUpload.then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      })
  }
  
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  deconnect(){
    this.authService.signOutUser();
    location.reload();
  }
}
