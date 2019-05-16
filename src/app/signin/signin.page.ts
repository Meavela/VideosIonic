import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;

  constructor(private navCtrl:NavController,
              private formBuilder: FormBuilder,
              private authService: AuthService) 
  { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
  toAdd:any = {}
  onSubmit() {
    this.authService.signInUser(this.toAdd.email, this.toAdd.password).then(
      () => {
        this.navCtrl.pop();
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
