import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

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

  constructor(private formBuilder: FormBuilder, private videoService: VideoService,
              private router: Router) { }

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

  onSaveVideo(){
    var titre = this.videoForm.get('titre').value;
    var type = this.videoForm.get('type').value;
    var genre = this.videoForm.get('genre').value;
    var description = this.videoForm.get('description').value;
    if(this.fileUrl && this.fileUrl !== '') {

      var image = this.fileUrl;
    }else{
      // newBook.photo = "https://firebasestorage.googleapis.com/v0/b/myfirstapp-b7a86.appspot.com/o/images%2FUniversit%C3%A9.jpg?alt=media&token=4fc41251-f187-4a00-ba67-8b960cbac7f2";
    }
    var date = new Date();
    var idUtilisateur = "ghMpEJSE7PRCGL9qwtwKP1XAGdg2";
    
    
    this.videoService.getVideos();
    var allVideos = this.videoService.videos;
    allVideos.forEach(element => {
      console.log(element);
    });
  }
}
