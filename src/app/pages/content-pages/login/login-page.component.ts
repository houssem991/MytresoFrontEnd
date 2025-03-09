import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/services/auth.service';
import {NgxSpinnerService} from "ngx-spinner";
import {TokenStorageService} from '../../../shared/services/token-storage.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  logoUrl = 'assets/img/Vector.png'
  loginFormSubmitted = false;
  isLoginFailed = false;
  roles: any;
  erreurMessage: any;
  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
    rememberMe: new UntypedFormControl(true)
  });


  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.loginFormSubmitted = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/dashboard/dashboard1']);

    }
  }
  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
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

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        console.log(this.loginForm);

        this.isLoginFailed = false;
        this.loginFormSubmitted = true;
        this.router.navigate(['/dashboard/dashboard1']);
        this.spinner.hide();
      },
      err => {
        this.isLoginFailed = true;
        this.erreurMessage = err.error.message;
        this.spinner.hide();
        console.log('error: ' + err)
      }
    );
  }

}
