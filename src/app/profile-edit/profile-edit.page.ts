import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Events } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  
  isConnected: boolean = false;
  public result: Array<any> = [];
  userForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  currentUser;

  constructor(private authService: AuthService, 
              private router: Router, 
              private videoService: VideoService,
              private formBuilder: FormBuilder,
              public events: Events) { }

  ngOnInit() {
    
    this.initForm();

    this.currentUser = this.authService.currentUser();
    if(this.currentUser != null){
      this.isConnected = true;
    }
    
    this.events.publish('isConnected:changed', this.isConnected);

    console.log(this.currentUser);
    this.result.push(this.currentUser);
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  toAdd:any = {}
  onSaveProfile(){
    if(this.fileUrl && this.fileUrl !== '') {
    }else{
      this.fileUrl = this.currentUser["photoURL"];
    }
    if(this.toAdd.displayName == null) {
      this.toAdd.displayName = this.currentUser["displayName"];
    }
    this.authService.updateUser(this.toAdd.displayName,this.fileUrl);
    
    this.router.navigate(['/profile']);
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
    this.router.navigate(['/home']);
  }
}
