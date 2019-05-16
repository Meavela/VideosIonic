import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Liste vidéos',
      url: '/videos',
      icon: 'list'
    },
    {
      title: 'Ajouter vidéo',
      url: '/new',
      icon: 'add'
    }
  ];

  public isConnected: boolean = false;
  
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router, 
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events: Events,
    db: AngularFirestore
  ) {
    this.initializeApp();
    this.events.subscribe('isConnected:changed', isConnected => {
      this.isConnected = isConnected;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
  }

  deconnect(){
    this.authService.signOutUser();
    this.router.navigate(['/home']);
    // location.reload();
  }
}
