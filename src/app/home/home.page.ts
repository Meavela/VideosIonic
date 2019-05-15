import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public isConnected: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              public navCtrl: NavController) 
  { 
  }

  ngOnInit() {
    var currentUser = this.authService.currentUser();
    if(currentUser != null){
      this.isConnected = true;
    }
  }
  deconnect(){
    this.authService.signOutUser();
    // this.navCtrl.pop();
    location.reload();
  }
}
