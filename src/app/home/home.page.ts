import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavController, Events } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public isConnected: boolean = false;

  constructor(private authService: AuthService,
              public events: Events,
              public navCtrl: NavController) 
  { 
  }

  ngOnInit() {
    var currentUser = this.authService.currentUser();
    if(currentUser != null){
      this.isConnected = true;
    }
    
    this.events.publish('isConnected:changed', this.isConnected);
  }
  deconnect(){
    this.authService.signOutUser();
    location.reload();
  }
}
