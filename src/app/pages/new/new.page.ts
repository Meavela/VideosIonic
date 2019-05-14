import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video.model';

// @Injectable()

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

  constructor(private formBuilder: FormBuilder, private router: Router, private videoService: VideoService) 
  { }

  ngOnInit() {
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
    this.toAdd.idUtilisateur = "ghMpEJSE7PRCGL9qwtwKP1XAGdg2";
    
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
  writeURL(url: string) {
    console.log(url);
  }
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
