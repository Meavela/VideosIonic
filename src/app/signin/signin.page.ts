import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AnimationService, AnimationBuilder } from 'css-animator';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {


  signinForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router, 
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
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
