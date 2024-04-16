import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {TokenStorageService} from '../../../shared/services/token-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
  forogtPasswordFormSubmitted = false;
  isSubmitFailed = false;
  errorSubmit: any;
  roles: any;
  forogtPasswordForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required]),
  });


  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
  }
  get lf() {
    return this.forogtPasswordForm.controls;
  }

  // On submit button click
  onSubmit() {
    if (this.forogtPasswordForm.invalid) {
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

    this.authService.forgotpassword(this.forogtPasswordForm.value.email).subscribe(
      data => {
        console.log(this.forogtPasswordForm);

        this.isSubmitFailed = false;
        this.forogtPasswordFormSubmitted = true;
        this.spinner.hide();
      },
      err => {
        this.isSubmitFailed = true;
        this.forogtPasswordFormSubmitted = false;
        this.errorSubmit = err.error.message;
        this.spinner.hide();
        console.log('error: ' + err)
      }
    );
  }

}
