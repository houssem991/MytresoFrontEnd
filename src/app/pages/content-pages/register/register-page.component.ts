import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../../shared/services/auth.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  registerFormSubmitted = false;
  registerForm: UntypedFormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  selectedFiles: FileList;
  selected: FileList;
  currentFile: File;
  current: File;
  message = '';
  fileInfos: Observable<any>;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private authService: AuthService, private spinner: NgxSpinnerService) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      image: ['', Validators.required],
      role: [Array, Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit() {
  }

  get rf() {
    return this.registerForm.controls;
  }


  //  On submit click, reset field value
  onSubmit(): void{

    this.registerFormSubmitted = true;
    if (this.registerForm.invalid) {
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
    console.log(this.registerForm);
    this.authService.register(this.registerForm).subscribe(
      data => {
        this.currentFile = this.selectedFiles.item(0);
        this.authService.uploadimage( data.message, this.currentFile).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
            } else if (event instanceof HttpResponse) {
              this.message = 'le fichier a téléchargé avec succès';
            }
          },
          err => {
            this.message = 'le fichier a téléchargé avec succès';
            this.currentFile = undefined;
          });
        this.selectedFiles = undefined;
        this.selected = undefined;
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.spinner.hide();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
        this.isSignUpFailed = true;
        this.spinner.hide();
      }
    );
  }


  selectFile(event): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }
}
