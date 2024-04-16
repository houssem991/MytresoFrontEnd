import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  email: any;
  token: any;
  errorMessage = '';
  message: any;

  isnotsamepasseword = false;
  ChangePasswordFormSubmitted = false;
  isSubmitFailed = false;
  roles: any;
  ChangePasswordForm = new UntypedFormGroup({
    password: new UntypedFormControl('', [Validators.required]),
    Confirm_password: new UntypedFormControl('', [Validators.required]),
  });


  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute) {
    this.email = this.route['params']['value']['email'];
    this.token = this.route['params']['value']['token'];
  }
  ngOnInit(): void {
  }
  get lf() {
    return this.ChangePasswordForm.controls;
  }

  // On submit button click
  onSubmit() {
    if (this.ChangePasswordForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    if (this.ChangePasswordForm.value.password === this.ChangePasswordForm.value.Confirm_password) {
      this.authService.reset(this.token , this.email , this.ChangePasswordForm.value.password).subscribe(
        data => {
          this.ChangePasswordFormSubmitted = true;
          this.isSubmitFailed = false;
          this.isnotsamepasseword = false;
          this.message = data.message;
          this.spinner.hide();
        },
        err => {
          this.isnotsamepasseword = false;
          this.ChangePasswordFormSubmitted = false;
          this.errorMessage = err.error.message;
          this.isSubmitFailed = true;
          this.spinner.hide();
        }
      );
    } else {this.isnotsamepasseword = true ;
      this.isSubmitFailed = false;
      this.ChangePasswordFormSubmitted = false;
      this.spinner.hide();
    }
  }


}
