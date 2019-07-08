import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  public users: User[];
  isConnected: boolean = false;
  allData = []; //Store all data from provider
  filterData = [];//Store filtered data
  searchTerm: string = '';

  constructor(private authService: AuthService,
              private usersService: UserService,
              public events: Events) 
  { 

  }

  ngOnInit() {
    var currentUser = this.authService.currentUser();
    if(currentUser != null){
      this.isConnected = true;
    }

    this.usersService.getUsers();
    this.usersService.users.subscribe(
      (users: User[]) => {
        this.users = users;
        this.allData = users;
        this.filterData = this.allData;
      }
    );
  }

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
