import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  isConnected: boolean = false;
  public result: Array<any> = [];

  constructor(private authService: AuthService, 
              private router: Router, 
              public events: Events) { }

  ngOnInit() {

    var currentUser = this.authService.currentUser();
    if(currentUser != null){
      this.isConnected = true;
    }
    
    this.events.publish('isConnected:changed', this.isConnected);

    var user = this.authService.getSingleUserByMail(currentUser["email"]);
    var passed = false;
    user.subscribe(item => {
      item.forEach(element => {
        if(!passed){
          passed = true;
          this.result.pop();
          this.result.push(element);
        }
      });
    });

    
  }
  
  deconnect(){
    this.authService.signOutUser();
    this.router.navigate(['/home']);
  }
}
