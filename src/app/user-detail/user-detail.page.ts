import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  public result: Array<any> = [];
  isConnected: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private usersService: UserService,
              private authService: AuthService,
              public events: Events) 
  { 

  }

  ngOnInit() {
    this.result = [];

    var idUser = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.usersService.getSingleUser(idUser);

    this.usersService.users.subscribe(item => {
      item.forEach(user => {
        this.result.pop();
        this.result.push(user);

        var currentUser = this.authService.currentUser();
        if(currentUser != null){
          this.isConnected = true;
          this.events.publish('isConnected:changed', this.isConnected);
          
        }
      });
    });
  }

  deconnect(){
    this.authService.signOutUser();
    location.reload();
  }

}
