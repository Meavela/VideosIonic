import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  public result: Array<any> = [];
  isConnected: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private usersService: UserService) 
  { 

  }

  ngOnInit() {
    this.result = [];

    var idUser = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.usersService.getSingleUser(idUser);
  }

}
